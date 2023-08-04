<template>
	<view :class="formItemClass">
		<view :class="[`${classPrefix}-wrap`, `${classPrefix}--${labelAlign}`]">
			<view :class="labelClasses" :style="labelStyle">
				<text :for="props.for">
					{{label}}
				</text>
			</view>
			<view :class="contentClasses" :style="contentStyle">
				<view :class="contentSlotClasses">
					<slot></slot>
				</view>
				<view v-if="help" :class="[`${classPrefix}-help`, `${prefix}-form__controls--${contentAlign}`]">
					<text>{{help}}</text>
				</view>
				<view v-if="extraNode" :class="[`${classPrefix}-extra`, `${prefix}-form__controls--${contentAlign}`]">
					{{ extraNode }}
				</view>
			</view>
		</view>
		<t-icon v-if="arrow " name="chevron-right" size="48rpx" color='rgba(0, 0, 0, .4)' />
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		inject,
		nextTick,
		onBeforeUnmount,
		onMounted,
		toRefs,
		ref,
		reactive,
		watch
	} from "vue"
	import FormItemProps from "./props"
	import {
		ValidateStatus
	} from "./const"
	import {
		isArray,
		isNumber,
		isString,
		isBoolean,
		cloneDeep,
		isNil,
		get as lodashGet,
		set as lodashSet,
		template as lodashTemplate
	} from "lodash-es"
	import {
		validate
	} from "../../common/libs/validate"
	import Icon from "../icon"
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-form-item`;
	const classPrefix = `${prefix}-form__item`;
	export default defineComponent({
		name: componentName,
		props: FormItemProps,
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		setup(props, {
			slots
		}) {

			const {
				name
			} = toRefs(props);

			const internalInstance = getCurrentInstance();
			const form = inject('FormProvide', undefined)

			const errorList = ref([]);
			const successList = ref([]);

			const freeShowErrorMessage = ref(false);
			const showErrorMessage = computed(() => {
				if (isBoolean(freeShowErrorMessage.value)) return freeShowErrorMessage.value;
				if (isBoolean(props.showErrorMessage)) return props.showErrorMessage;
				return form?.showErrorMessage;
			});

			//提示信息
			const extraNode = computed(() => {
				const list = errorList.value;
				if (showErrorMessage.value && list[0]?.message) {
					return list[0]?.message;
				}
				if (successList.value.length) {
					return successList.value[0].message;
				}
				return null;
			})

			const errorClasses = computed(() => {
				if (!showErrorMessage.value) return '';
				if (!errorList.value.length) return '';
				const type = errorList.value[0].type || 'error';
				return type === 'error' ? `${classPrefix}--error` : `${classPrefix}--warning`;
			});

			const contentClasses = computed(() => [`${prefix}-form__controls`, errorClasses.value]);
			const contentSlotClasses = computed(() => [
				`${prefix}-form__controls-content`,
				`${prefix}-form__controls--${contentAlign.value}`,
			]);

			const contentStyle = computed(() => {
				let contentStyle = {};
				if (labelWidth.value && labelAlign.value !== 'top') {
					if (isNumber(labelWidth.value)) {
						contentStyle = {
							marginLeft: `${labelWidth.value}px`
						};
					} else {
						contentStyle = {
							marginLeft: labelWidth.value
						};
					}
				}

				return contentStyle;
			});


			const needRequiredMark = computed(() => {
				const requiredMark = props.requiredMark ?? form?.requiredMark;
				const isRequired = innerRules.value.filter((rule) => rule.required).length > 0;
				return requiredMark ?? isRequired;
			});

			const hasLabel = computed(() => slots.label || props.label);
			const hasColon = computed(() => !!(form?.colon && hasLabel.value));
			const FROM_LABEL = `${prefix}-form__label`;
			const labelAlign = computed(() => (isNil(props.labelAlign) ? form?.labelAlign : props.labelAlign));
			const labelWidth = computed(() => (isNil(props.labelWidth) ? form?.labelWidth : props.labelWidth));
			const contentAlign = computed(() => (isNil(props.contentAlign) ? form?.contentAlign : props
				.contentAlign));

			const labelClasses = computed(() => [
				`${prefix}-form__label`,
				{
					[`${FROM_LABEL}--required`]: needRequiredMark.value,
					[`${FROM_LABEL}--colon`]: hasColon.value,
					[`${FROM_LABEL}--top`]: hasLabel.value && (labelAlign.value === 'top' || !labelWidth
						.value),
					[`${FROM_LABEL}--left`]: labelAlign.value === 'left' && labelWidth.value,
					[`${FROM_LABEL}--right`]: labelAlign.value === 'right' && labelWidth.value,
				},
			]);

			const labelStyle = computed(() => {
				if (labelWidth.value && labelAlign.value !== 'top') {
					return isNumber(labelWidth.value) ? {
						width: `${labelWidth.value}px`
					} : {
						width: labelWidth.value
					};
				}
				return {};
			});

			const formItemClass = computed(() => [
				classPrefix,
				`${classPrefix}--bordered`,
				`${prefix}-form--${labelAlign.value}`,
				`${classPrefix}__${props.name}`,
				{
					[`${classPrefix}-with-help`]: props.help,
				},
			]);


			const verifyStatus = ref(ValidateStatus.TO_BE_VALIDATED);
			const resetValidating = ref(false);
			const needResetField = ref(false);

			const value = computed(() => form?.model && lodashGet(form?.model, `${name.value}`));
			const initialValue = ref(undefined);

			/**
			 * 重置信息
			 */
			const resetHandler = () => {
				needResetField.value = false;
				errorList.value = [];
				successList.value = [];
				verifyStatus.value = ValidateStatus.TO_BE_VALIDATED
			}

			const getEmptyValue = () => {
				const type = Object.prototype.toString.call(lodashGet(form?.model, `${props.name}`));
				let emptyValue;

				if (type === '[object String]') {
					emptyValue = '';
				}
				if (type === '[object Array]') {
					emptyValue = [];
				}
				if (type === '[object Object]') {
					emptyValue = {};
				}
				return emptyValue;
			}

			//重置表单
			const resetField = async (resetType) => {
				if (!props.name) return null;
				//重置为空值
				if (resetType === 'empty') {
					lodashSet(form?.model, props.name, getEmptyValue())
				} else if (resetType === 'initial') { //重置为初值
					lodashSet(form?.model, props.name, initialValue.value)
				}
				await nextTick();
				if (resetValidating.value) {
					needResetField.value = true;
				} else {
					resetHandler()
				}
			}

			const errorMessages = computed(() => form?.errorMessages || {});

			const innerRules = computed(() => {
				if (props.rules?.length) return props.rules;
				if (!props.name) return [];
				const index = `${props.name}`.lastIndexOf('.') || -1;
				const pRuleName = `${props.name}`.slice(index + 1);
				return lodashGet(form?.rules, props.name) || lodashGet(form?.rules, pRuleName) || [];
			});

			const analysisValidateResult = async (trigger) => {
				const result = {
					successList: [],
					errorList: [],
					rules: [],
					resultList: [],
					allowSetValue: false,
				};
				result.rules =
					trigger === 'all' ?
					innerRules.value :
					innerRules.value.filter((item) => (item.trigger || 'change') === trigger);
				if (innerRules.value.length && !result.rules?.length) {
					return result;
				}
				result.allowSetValue = true;
				result.resultList = await validate(value.value, result.rules);
				result.errorList = result.resultList
					.filter((item) => item.result !== true)
					.map((item) => {
						Object.keys(item).forEach((key) => {
							if (!item.message && errorMessages.value[key]) {
								const compiled = lodashTemplate(errorMessages.value[key]);
								const name = isString(props.label) ? props.label : props.name;
								item.message = compiled({
									name,
									validate: item[key],
								});
							}
						});
						return item;
					});
				// 仅有自定义校验方法才会存在 successList
				result.successList = result.resultList.filter(
					(item) => item.result === true && item.message && item.type === 'success',
				);
				return result;
			};

			const validateHandler = async (trigger, showErrorMessage) => {
				resetValidating.value = true;
				// undefined | boolean
				freeShowErrorMessage.value = showErrorMessage;
				const {
					successList: innerSuccessList,
					errorList: innerErrorList,
					rules,
					resultList,
					allowSetValue,
				} = await analysisValidateResult(trigger);

				if (allowSetValue) {
					successList.value = innerSuccessList || [];
					errorList.value = innerErrorList || [];
				}
				// 根据校验结果设置校验状态
				if (rules.length) {
					verifyStatus.value = innerErrorList?.length ? ValidateStatus.FAIL : ValidateStatus
						.SUCCESS;
				}
				// 重置处理
				if (needResetField.value) {
					resetHandler();
				}
				resetValidating.value = false;

				return {
					[`${name.value}`]: innerErrorList?.length === 0 ? true : resultList,
				};
			}

			const setValidateMessage = (validateMessage) => {
				if (!validateMessage && !isArray(validateMessage)) return;
				if (validateMessage.length === 0) {
					errorList.value = [];
					verifyStatus.value = ValidateStatus.SUCCESS;
				}
				errorList.value = validateMessage.map((item) => ({
					...item,
					result: false
				}));
				verifyStatus.value = ValidateStatus.FAIL;
			}

			const context = reactive({
				name,
				resetHandler,
				resetField,
				validate: validateHandler,
				setValidateMessage,
			});

			onMounted(() => {
				initialValue.value = cloneDeep(value.value);
				form?.children.push(context);
			});

			onBeforeUnmount(() => {
				if (form) form.children = form?.children.filter((ctx) => ctx !== context);
			});

			watch(value, async () => {
				await validateHandler('change')
			}, {
				deep: true
			});

			watch(
				() => [props.name, JSON.stringify(props.rules)].join(','),
				() => {
					validateHandler('change')
				}
			);



			return {
				prefix,
				classPrefix,
				props,
				labelAlign,
				formItemClass,
				extraNode,
				contentClasses,
				contentSlotClasses,
				contentStyle,
				labelClasses,
				labelStyle,
			}

		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/formItem.less";
</style>