<template>
	<view :class="rootClasses">
		<view ref="rateWrapper" :class="`${classPrefix}__wrapper`" @touchstart="onTouchstart" @touchmove="onTouchmove"
			@touchend="onTouchEnd" @touchcancel="onTouchEnd">
			<t-icon v-for="(n,index) in count" :key="n" :size="size" :class="classes(index)"
				:style="{ marginRight: `${count > n ? gap : 0}px`, ...colors }"
				:name="getIconName(defaultValue,value,n)" @click="handleClick"></t-icon>
		</view>

		<text v-if="showText"
			:class="{ [`${classPrefix}__text`]: true, [`${classPrefix}__text--active`]: actualVal > 0 }">
			{{ rateText }}
		</text>

		<view v-if="tipsVisible" ref="ratePopoverRef" :class="`${classPrefix}__tips`"
			:style="{ left: `${tipsLeft}px` }">
			<view v-if="actionType === 'tap'" style="display: flex;">
				<view v-if="allowHalf" :class="{
				            [`${classPrefix}__tips-item`]: true,
				            [`${classPrefix}__tips-item--active`]: actualVal === Math.ceil(popoverValue) - 0.5,
				          }" @click="() => onSelect(Math.ceil(popoverValue) - 0.5)">
					<t-icon :class="`${classPrefix}__icon ${classPrefix}__icon--selected-half`"
						:name="getIconName(defaultValue, value, 0)" :style="{ ...colors }" :size="size"></t-icon>
					<view :class="`${classPrefix}__tips-text`">{{ Math.ceil(popoverValue) - 0.5 }}</view>
				</view>

				<view
					:class="{[`${classPrefix}__tips-item`]: true,[`${classPrefix}__tips-item--active`]: allowHalf && actualVal === Math.ceil(popoverValue),}"
					@click="() => onSelect(Math.ceil(popoverValue))">
					<t-icon :class="`${classPrefix}__icon ${classPrefix}__icon--selected`"
						:name="getIconName(defaultValue, 0, 0)" :style="{ ...colors }" :size="size"></t-icon>
					<view :class="`${classPrefix}__tips-text`">{{ Math.ceil(popoverValue)  }}</view>
				</view>

			</view>
			<view v-else :class="`${classPrefix}__tips-item`" @click="()=>onSelect(popoverValue)">
				<t-icon :name="getIconName(defaultValue,0,0)" :style="{...colors}" :size="size" :class="{
            [`${classPrefix}__icon`]: true,
            [`${classPrefix}__icon--selected`]: Math.ceil(popoverValue) === popoverValue,
            [`${classPrefix}__icon--selected-half`]: Math.ceil(popoverValue) !== popoverValue,
          }"></t-icon>
				<view :class="`${classPrefix}__tips-text`">{{ popoverValue }}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		ref,
		unref
	} from "vue"
	import RateProps from "./props"
	import Icon from "../icon"
	import {
		useDefault,
		useFormDisabled
	} from '../../shared';
	import {
		getRect
	} from '../../shared/dom';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-rate`;
	export default defineComponent({
		name: componentName,
		props: RateProps,
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		emits: ['change', 'update:value', 'update:modelValue'],
		setup(props, context) {
			const disabled = useFormDisabled();

			const internalInstance = getCurrentInstance();

			const rateWrapper = ref(null);
			const scaleIndex = ref(-1);
			const ratePopoverRef = ref();
			const popoverValue = ref(0);
			const timer = ref(null);
			const touchEnd = ref(false);
			const tipsVisible = ref(false);
			const tipsLeft = ref(0);
			const actionType = ref('tap'); //move || tap
			const touchStartTime = ref(0);

			const [actualVal] = useDefault(props, context.emit, 'value', 'change');

			//描述文字
			const rateText = computed(() => {
				if (Array.isArray(props.texts) && props.texts.length > 0) {
					return props.texts[actualVal.value - 1];
				}

				return actualVal.value > 0 ? `${actualVal.value} 分` : '未评分';
			});

			//评分图标颜色
			const colors = computed(() => {
				const {
					color
				} = props;
				if (Array.isArray(color) && color.length === 2) {
					return {
						'--td-rate-selected-color': color[0],
						'--td-rate-unselected-color': color[1],
					};
				}
				if (typeof color === 'string') {
					return {
						'--td-rate-selected-color': color,
					};
				}
				return {};
			})

			const rootClasses = computed(() => [componentName, {
				[`${componentName}--disabled`]: disabled.value
			}]);

			//点评图标样式
			const classes = (n) => {
				const classPrefix = `${componentName}__icon`;
				const className = {
					[classPrefix]: true,
				};
				const {
					allowHalf
				} = props;
				if (scaleIndex.value === n + 1) {
					className[`${classPrefix}--current`] = true;
				}
				if (actualVal.value >= n + 1) {
					className[`${classPrefix}--selected`] = true;
					if (disabled.value) {
						className[`${classPrefix}--disabled`] = true;
					}

				} else if (allowHalf && actualVal.value - n > 0) {
					className[`${classPrefix}--selected-half`] = true;
					if (disabled.value) {
						className[`${classPrefix}--disabled-half`] = true;
					}
				} else {
					className[`${classPrefix}--unselected`] = true;
				}
				return className;
			};


			//评分图标名
			const getIconName = (defaultValue, value, index) => {
				const curVal = value ? value : defaultValue;
				let name = ['star-filled', 'star-filled'];

				const {
					icon
				} = props

				if (icon) {
					name = Array.isArray(icon) ? icon : [icon, icon];
				}

				return name[curVal >= index + 1 ? 0 : 1];
			};

			const unitConvert = (value) => {
				if (typeof value === 'string') {
					return parseInt(value, 10)
				}
				return value;
			};

			//关闭tips
			const handleCloseTips = () => {
				tipsVisible.value = false;
				scaleIndex.value = -1;
				if (timer.value) {
					clearTimeout(timer.value);
				}
			}

			//隐藏提示框
			const hideTips = (delay = false) => {
				if (delay) {
					timer.value = setTimeout(() => {
						handleCloseTips();
					}, 3000);
				} else {
					handleCloseTips();
				}
			}

			//获取点评元素位置
			const getRateRect = (event, eventType) => {
				// #ifdef H5
				if (!rateWrapper.value) return;
				// #endif
				const {
					count,
					allowHalf,
					gap,
					value: currentValue,
					size
				} = props;
				const margin = unitConvert(gap);
				//点击当前元素所在位置 TODO:onTouchmove 不能通过 event.detail 获取 位置，点击事件可以获取到
				const {
					pageX
				} = event.changedTouches[0];


				//获取点评节点信息，并设置
				getRect(`.${componentName}__wrapper`, false, internalInstance.proxy).then((rect) => {
					const {
						width,
						left
					} = rect;
					const starWidth = (width - (count - 1) * margin) / count;
					const offsetX = pageX - left;
					const num = (offsetX + margin) / (starWidth + margin);
					const remainder = num % 1;
					const integral = num - remainder;
					let value = remainder <= 0.5 && allowHalf ? integral + 0.5 : integral + 1;

					if (value > count) {
						value = count;
					} else if (value < 0) {
						value = 0;
					}

					popoverValue.value = value;

					const leftDis = Math.ceil(value - 1) * (unitConvert(gap) + unitConvert(size)) +
						unitConvert(size) * 0.5;
					tipsVisible.value = true;
					tipsLeft.value = Math.max(leftDis, unitConvert(size) * 0.5);
					scaleIndex.value = Math.ceil(value);
					actionType.value = eventType;

					if (value !== currentValue) {
						actualVal.value = value;
						context.emit('change', value)
					}

					if (touchEnd.value) {
						hideTips(true);
					}
				});

			}

			//点击图标评价
			const handleClick = (event) => {
				if (disabled.value) return;
				getRateRect(event, 'tap');
			}

			const onTouch = (event, eventType) => {
				getRateRect(event, eventType)
			}

			//开始滑动点评
			const onTouchstart = (e) => {
				if (disabled.value) return;
				touchStartTime.value = Date.now();
				touchEnd.value = false;
			}

			const onTouchmove = (e) => {
				if (disabled.value) return;
				if (Date.now() - touchStartTime.value <= 200) return;
				onTouch(e, 'move');
			}

			const onTouchEnd = (e) => {
				if (disabled.value) return;
				touchEnd.value = true;
				hideTips();
			}

			const onSelect = (value) => {
				context.emit('change', value)
				actualVal.value = value;
				hideTips();
			}

			return {
				classPrefix: componentName,
				rateWrapper,
				rootClasses,
				actualVal,
				rateText,
				colors,
				classes,
				actionType,
				getIconName,
				onTouchstart,
				onTouchmove,
				onTouchEnd,
				ratePopoverRef,
				tipsVisible,
				tipsLeft,
				handleClick,
				popoverValue,
				onSelect
			}

		}

	})
</script>

<style lang="less" :scoped="false">
	@import "./style/rate.less";
</style>