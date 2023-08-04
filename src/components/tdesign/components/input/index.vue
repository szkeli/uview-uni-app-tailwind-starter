<template>
	<view :class="styleWrapper">
		<view :class="`${classPrefix}__wrap--prefix`">
			<view class="{{classPrefix}}__icon--prefix">
				<slot name="prefixIcon" />
				<t-icon v-if="prefixIcon" :name="prefixIcon"></t-icon>
			</view>
			<view :class="`${classPrefix}__label`">
				<slot name="label" />
				<text v-if="label" :class="`${prefix}-class-label`">{{label}}</text>
			</view>
		</view>
		<view :class="`${classPrefix}__wrap`">
			<view :class="`${classPrefix}__content ${classPrefix}--${status || 'default'}`">
				<input ref="inputRef" :name="name" :value="innerValue" :class="inputClasses" :type="type"
					:focus="focused" :disabled="disabled" :password="type === 'password'" :placeholder="placeholder"
					:readonly="readonly" :maxlength="maxlength || -1" @focus="handleFocus" @blur="handleBlur"
					@input="handleInput" @compositionend="handleCompositionend"
					@keyboardheightchange="handleKeyboardheightchange" />
				<view v-if="clearable && innerValue && innerValue.length > 0"
					:class="`${classPrefix}__wrap--clearable-icon`" @click.stop="handleClear">
					<t-icon name="close-circle-filled"></t-icon>
				</view>
				<view :class="`${classPrefix}__wrap--suffix`">
					<slot name="suffix" />
					<text v-if="suffix">{{suffix}}</text>
				</view>
				<view :class="`${classPrefix}__wrap--suffix-icon`">
					<slot name="suffixIcon" />
					<t-icon v-if="suffixIcon" :name="suffixIcon"></t-icon>
				</view>
			</view>
			<view v-if="tips && tips.length > 0"
				:class="`${classPrefix}__tips ${classPrefix}--${align} ${prefix}-class-tips`">
				{{tips}}
			</view>
			<slot name="tips" />
		</view>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		nextTick,
		ref,
		toRefs
	} from "vue"
	import config from '../../common/config';
	import InputProps from './props';
	import Icon from "../icon"
	import {
		useEmitEvent,
		useFormDisabled,
		useDefault,
		extendAPI,
		getCharacterLength
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-input`;
	export default defineComponent({
		name: componentName,
		props: InputProps,
		emits: ['update:value', 'update:modelValue', 'click-icon', 'focus', 'blur', 'change', 'clear',
			'keyboardheightchange'
		],
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		setup(props, context) {
			const classPrefix = componentName;
			const emitEvent = useEmitEvent(props, context.emit)
			const disabled = useFormDisabled();

			const inputRef = ref();
			const focused = ref(false);
			const internalInstance = getCurrentInstance();

			const [innerValue] = useDefault(props, context.emit, 'value', 'change');


			const styleWrapper = computed(() => [
				componentName,
				{
					[`${componentName}--layout-${props.layout}`]: props.layout,
					[`${componentName}--size-${props.size}`]: props.size,
					[`${componentName}--center`]: props.labelAlign === 'center',
					[`${componentName}--border`]: !props.borderless,
				},
			]);

			const status = props.status || 'default';
			const inputClasses = computed(() => [
				`${componentName}__control`,
				{
					[`${componentName}--${props.align}`]: props.align !== 'left',
					[`${componentName}--${status}`]: status,
					[`${componentName}__control--disabled`]: disabled.value,
				},
			]);

			const setInputValue = (v) => {
				const input = inputRef.value;
				const sV = String(v);
				if (!input) {
					return;
				}
				if (input.value !== sV) {
					input.value = sV;
				}
			};


			const handleFocus = (e) => {
				emitEvent('focus', innerValue.value, {
					e
				});
			};
			const handleBlur = (e) => {
				emitEvent('blur', innerValue.value, {
					e
				});
			};

			const handleInput = (e) => {
				// 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
				// const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
				// if (e.isComposing || checkInputType) return;
				inputValueChangeHandle(e);
			};

			const inputValueChangeHandle = (e) => {
				const {
					value
				} = e.detail;
				const {
					allowInputOverMax,
					maxcharacter
				} = props;
				if (!allowInputOverMax && maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
					const {
						length = 0, characters = ''
					} = getCharacterLength(value, maxcharacter);
					innerValue.value = characters;
				} else {
					innerValue.value = value;
				}
				nextTick(() => setInputValue(innerValue.value));
			};

			const handleCompositionend = (e) => {
				inputValueChangeHandle(e);
			};

			const handleClear = (e) => {
				innerValue.value = '';
				focused.value = true;
				emitEvent('clear', {
					e
				});
			};

			const handleKeyboardheightchange = (e) => {
				emitEvent('keyboardheightchange', {
					e
				});
			}

			const focus = () => {
				focused.value = true;
			};

			const blur = () => {
				focused.value = false;
				// inputRef.value?.blur();
			};

			extendAPI({
				focus,
				blur
			});



			return {
				prefix,
				classPrefix,
				inputRef,
				innerValue,
				...toRefs(props),
				disabled,
				inputClasses,
				styleWrapper,
				handleFocus,
				handleBlur,
				handleInput,
				handleClear,
				handleCompositionend,
				handleKeyboardheightchange,
				focused
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/input.less";
</style>