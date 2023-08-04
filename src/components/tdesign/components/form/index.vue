<template>
	<view :class="formClass" ref="formRef">
		<slot></slot>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		provide,
		reactive,
		ref,
		toRefs
	} from "vue"
	import {
		isEmpty,
		isArray,
		isFunction
	} from 'lodash-es';
	import FormProps from './props';
	import {
		preventDefault
	} from '../../shared/dom';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-form`;
	export default defineComponent({
		name: componentName,
		props: FormProps,
		options: componentOptions,
		// emits: ['validate', 'submit','reset'],
		setup(props, {
			expose
		}) {

			const {
				disabled,
				showErrorMessage,
				labelWidth,
				labelAlign,
				contentAlign,
				model,
				colon,
				requiredMark,
				rules,
				errorMessage,
				resetType,
			} = toRefs(props);

			const formRef = ref(null);
			const children = ref([]);

			provide('formDisabled', {
				disabled,
			});

			provide(
				'FormProvide',
				reactive({
					showErrorMessage,
					labelWidth,
					labelAlign,
					contentAlign,
					model,
					colon,
					requiredMark,
					rules,
					errorMessage,
					resetType,
					children,
				}),
			);

			const needValidate = (name, fields) => {
				if (!fields || !isArray(fields)) return true;
				return fields.indexOf(`${name}`) !== -1;
			};
			const formatValidateResult = (validateResultList) => {
				const result = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
				Object.keys(result).forEach((key) => {
					if (result[key] === true) {
						delete result[key];
					}
				});
				return isEmpty(result) ? [] : result;
			};

			/**
			 * 表单校验
			 */
			const validate = async (param) => {
				const {
					fields,
					trigger = 'all',
					showErrorMessage
				} = param || {};
				const list = children.value
					.filter((child) => isFunction(child.validate) && needValidate(String(child.name),
						fields))
					.map((child) => child.validate(trigger, showErrorMessage));
				const arr = await Promise.all(list);
				const result = formatValidateResult(arr);
				return {
					isValid: isArray(result) ? result.length === 0 : false,
					fields: result
				}
			};

			// const submitParams = ref();

			// const onSubmit = (e) => {
			// 	if (props.preventSubmitDefault && e) {
			// 		preventDefault(e, true);
			// 	}
			// 	validate(submitParams.value).then((r) => {
			// 		// @ts-ignore
			// 		props.onSubmit?.({
			// 			validateResult: r
			// 		});
			// 	});
			// 	submitParams.value = undefined;
			// };
			// const submit = async (params) => {
			// 	submitParams.value = params;
			// 	requestSubmit(formRef.value);
			// };

			// const resetParams = ref();
			// const onReset = (e) => {
			// 	if (props.preventSubmitDefault && e) {
			// 		preventDefault(e, true);
			// 	}
			// 	children.value.filter((child) => isFunction(child.resetField) && needValidate(String(child
			// 		.name), resetParams.value?.fields)).forEach((child) => child.resetField(resetParams
			// 		.value?.type));
			// 	resetParams.value = undefined;
			// 	props.onReset?.({
			// 		e
			// 	});
			// }

			// const reset = (params) => {
			// 	resetParams.value = params;
			// 	formRef.value.reset();
			// };
			//清除表单校验信息
			const clearValidate = (fields) => {
				children.value.forEach((child) => {
					if (isFunction(child.resetHandler) && needValidate(String(child.name), fields)) {
						child.resetHandler();
					}
				});
			};

			//重置表单项
			const filterFields = (fields) => {
				children.value.forEach((child) => {
					if (isFunction(child.resetField) && needValidate(String(child.name), fields)) {
						child.resetField(props.resetType);
					}
				});
			}

			//设置表单校验规则
			const setValidateMessage = (validateMessage) => {
				const keys = Object.keys(validateMessage);
				if (!keys.length) return;
				const list = children.value
					.filter((child) => isFunction(child.setValidateMessage) && keys.includes(`${child.name}`))
					.map((child) => child.setValidateMessage(validateMessage[`${child.name}`]));
				Promise.all(list);
			};

			/**
			 * 重置该表单项，将其值重置为初始值，并移除校验结果
			 */
			const resetFields = (properties = []) => {
				if (!props.model) {
					console.error(componentName, 'model is required for resetFields to work.')
					return
				}
				// clearValidate(props.model)
				filterFields()
			}


			expose({
				validate,
				// submit,
				// reset,
				clearValidate,
				resetFields,
				setValidateMessage
			});



			return {
				formClass: componentName,
				formRef,
				// onSubmit,
				// onReset
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/form.less";
</style>