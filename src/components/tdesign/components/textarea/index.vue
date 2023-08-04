<template>
	<view :class="rootClass">
		<view :class="`${classPrefix}__label`">
			<block v-if="label">{{ label }}</block>
			<slot name="label" />
		</view>
		<view :class="`${classPrefix}__wrapper`">
			<textarea ref="textareaRef" :class="textareaClass" :value="innerValue" :name="name" :maxlength="maxlength"
				:disabled="disabled" :placeholder="placeholder" :placeholder-style="placeholderStyle"
				:placeholder-class="placeholderClass" :focus="focus" :auto-focus="autofocus" :auto-height="autosize"
				:fixed="fixed" :cursor-spacing="cursorSpacing" :cursor="cursor" :confirm-type="confirmType"
				:confirm-hold="confirmHold" :show-confirm-bar="showConfirmBar" :selection-start="selectionStart"
				:selection-end="selectionEnd" :hold-keyboard="holdKeyboard" :auto-blur="autoBlur" @focus="handleFocus"
				@blur="handleBlur" @input="handleInput" @linechange="handleLinechange" @confirm="handleConfirm"
				@keyboardheightchange="handleKeyboardheightchange">
				</textarea>
			<view v-if="indicator && (maxcharacter || maxlength)" :class="`${classPrefix}__indicator`">
				{{ `${textareaLength}/${maxcharacter || maxlength}` }}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		computed,
		toRefs,
		nextTick,
		ref,
		defineComponent
	} from "vue"
	import TextareaProps from './props';

	import {
		useEmitEvent,
		getCharacterLength,
		useVModel,
		useFormDisabled
	} from '../../shared';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-textarea`;
	export default defineComponent({
		name: componentName,
		props: TextareaProps,
		emits: ['update:value', 'update:modelValue', 'focus', 'blur', 'change', 'keyboardheightchange', 'enter',
			'lineChange'
		],
		options: componentOptions,
		setup(props, context) {

			const emitEvent = useEmitEvent(props, context.emit);
			const disabled = useFormDisabled();
			const textareaRef = ref(null);
			// const textareaStyle = ref();
			const textareaLength = ref(0);
			const {
				value,
				modelValue
			} = toRefs(props);
			const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

			const rootClass = computed(() => [
				`${componentName}`,
				{
					[`${componentName}--border`]: props.bordered,
				},
			]);
			const textareaClass = computed(() => [
				`${componentName}__wrapper-inner`,
				{
					[`${componentName}--disabled`]: disabled.value,
				},
			]);

			const setInputValue = (v) => {
				const input = textareaRef.value;
				const sV = String(v);
				if (!input) {
					return;
				}
				if (input.value !== sV) {
					input.value = sV;
				}
			};

			const textareaValueChangeHandle = (e) => {
				const {
					value
				} = e.detail
				if (
					props.maxcharacter &&
					props.maxcharacter > 0 &&
					!Number.isNaN(props.maxcharacter)
				) {
					const {
						length = 0, characters = ''
					} = getCharacterLength(value, props.maxcharacter);
					setInnerValue(characters);
					textareaLength.value = length;
				} else {
					setInnerValue(value)
					textareaLength.value = String(value).length;
				}
				nextTick(() => setInputValue(innerValue.value));
			};

			const handleFocus = (e) => {
				emitEvent('focus', innerValue.value, {
					e
				});
			}

			const handleBlur = (e) => {
				emitEvent('blur', innerValue.value, {
					e
				});
			}

			const handleInput = (e) => {
				textareaValueChangeHandle(e);
			}

			const handleLinechange = (e) => {
				emitEvent('lineChange', innerValue.value, {
					e
				});
			}

			const handleConfirm = (e) => {
				emitEvent('enter', innerValue.value, {
					e
				});
			}

			const handleKeyboardheightchange = (e) => {
				emitEvent('keyboardheightchange', innerValue.value, {
					e
				});
			}

			return {
				classPrefix: componentName,
				...toRefs(props),
				disabled,
				textareaRef,
				innerValue,
				rootClass,
				textareaClass,
				handleFocus,
				handleBlur,
				handleInput,
				handleLinechange,
				handleConfirm,
				handleKeyboardheightchange,
				textareaLength
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/textarea.less";
</style>