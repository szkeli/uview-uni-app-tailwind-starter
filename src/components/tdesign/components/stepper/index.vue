<template>
	<view :class="[`${classPrefix}`, `${classPrefix}--${size}`]">
		<view :class="[
		        `${classPrefix}__minus`,
		        `${classPrefix}__minus--${theme}`,
		        `${classPrefix}__icon--${size}`,
		        `${disabled || Number(stepperValue) <= min ? classPrefix + '--' + theme + '-disabled' : ''}`,
		      ]" @click="minusValue">
			<t-icon name="remove" :class="`${classPrefix}__minus-icon`" />
		</view>
		<input v-model="stepperValue" :class="[
        `${classPrefix}__input`,
        `${classPrefix}__input--${theme}`,
        `${classPrefix}__input--${size}`,
        `${disabled ? classPrefix + '--' + theme + '-disabled' : ''}`,
      ]" type="number" :style="inputStyle" :disabled="disableInput || disabled" :readonly="disableInput"
			@focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange"
			@keyboardheightchange="handleKeyboardheightchange" />
		<view :class="[
		        `${classPrefix}__plus`,
		        `${classPrefix}__plus--${theme}`,
		        `${classPrefix}__icon--${size}`,
		        `${disabled || Number(stepperValue) >= max ? classPrefix + '--' + theme + '-disabled' : ''}`,
		      ]" @click="plusValue">
			<t-icon name="add" :class="`${classPrefix}__plus-icon`" />
		</view>
	</view>
</template>

<script>
	import {
		toRefs,
		computed,
		defineComponent
	} from "vue"
	import Icon from "../icon"
	import StepperProps from './props';
	import {
		useDefault,
		useEmitEvent,
		useFormDisabled
	} from '../../shared';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-stepper`;
	export default defineComponent({
		name: componentName,
		props: StepperProps,
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		emits: ['update:value', 'update:modelValue', 'blur', 'change', 'overlimit', 'keyboardheightchange'],
		setup(props, context) {
			const [stepperValue] = useDefault(props, context.emit, 'value', 'change');
			const disabled = useFormDisabled();
			const emitEvent = useEmitEvent(props, context.emit);
			const {
				min,
				max,
				step,
				inputWidth
			} = toRefs(props);

			const inputStyle = computed(() => (inputWidth ? {
				width: `${inputWidth.value}px`
			} : ''));

			const isDisabled = (type) => {
				if (disabled.value) return true;
				if (type === 'minus' && Number(stepperValue.value) <= min.value) {
					return true;
				}
				if (type === 'plus' && Number(stepperValue.value) >= max.value) {
					return true;
				}
				return false;
			};

			const getLen = (num) => {
				const numStr = num.toString();
				return numStr.indexOf('.') === -1 ? 0 : numStr.split('.')[1].length;
			};

			const formatValue = (value) => {
				// 超过边界取边界值
				return Math.max(Math.min(max.value, value, Number.MAX_SAFE_INTEGER), min.value, Number
					.MIN_SAFE_INTEGER).toFixed(
					getLen(step.value),
				);
			};

			const updateValue = (value) => {
				stepperValue.value = value;
			};

			/**
			 * 精确加法
			 */
			const add = (a, b) => {
				const maxLen = Math.max(getLen(a), getLen(b));
				const base = 10 ** maxLen;
				return Math.round(a * base + b * base) / base;
			};



			/**
			 * 减少
			 */
			const minusValue = () => {
				if (isDisabled('minus')) {
					props.onOverlimit?.('minus');
					return;
				}
				updateValue(formatValue(add(Number(stepperValue.value), -step.value)));
			}

			/**
			 * 累加
			 */
			const plusValue = () => {
				if (isDisabled('plus')) {
					props.onOverlimit?.('plus');
					return;
				}
				updateValue(formatValue(add(Number(stepperValue.value), step.value)));

			}


			const handleInput = (e) => {
				const value = String(e.detail.value).replace(/[^\d]/g, '') || 0;
				// String(e.detail.value).split('.')[0].replace(/[^-0-9]/g, '') || 0;
				stepperValue.value = Number(value);
			};

			const handleChange = () => {
				const formattedValue = formatValue(Number(stepperValue.value));
				updateValue(formattedValue);
			};

			const handleFocus = () => {
				props.onFocus?.(Number(stepperValue.value));
			};

			const handleBlur = () => {
				props.onBlur?.(Number(stepperValue.value));
			};

			const handleKeyboardheightchange = (event) => {
				emitEvent('keyboardheightchange', Number(stepperValue.value), {
					event
				});
			}

			return {
				prefix,
				classPrefix: componentName,
				...toRefs(props),
				inputStyle,
				stepperValue,
				disabled,
				minusValue,
				plusValue,
				handleInput,
				handleChange,
				handleFocus,
				handleBlur,
				handleKeyboardheightchange
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/stepper.less";
</style>
<style lang="less" scoped>
	/* #ifdef H5 */
	uni-input {
		font-size: inherit;
	}

	/* #endif */
</style>