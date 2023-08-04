<template>
	<view :class="classPrefix">
		<slot v-if="!(options && options.length)" />
		<template v-else>
			<t-checkbox v-for="(item,index) in optionList" :key="index" :name="item.name || ''"
				:label="item.label || item.text || ''" :value="item.value" :check-all="item.checkAll"
				:block="item.block || true" :checked="item.checked || false" :content="item.content || ''"
				:content-disabled="item.contentDisabled || false" :icon="item.icon || 'circle'"
				:indeterminate="item.indeterminate || false" :disabled="item.disabled"
				:max-content-row="item.maxContentRow || 5" :max-label-row="item.maxLabelRow || 3"
				:readonly="item.readonly || false" :placement="item.placement || 'left'"></t-checkbox>
		</template>

	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		ref,
		toRefs,
		provide,
		watch
	} from "vue"
	import Checkbox from "../checkbox"
	import CheckboxProps from './props';
	import {
		useDefault
	} from '../../shared';
	import {
		getOptions,
		setCheckAllStatus
	} from './hooks';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-checkbox-group`;
	export default defineComponent({
		name: componentName,
		components: {
			[Checkbox.name]: Checkbox,
		},
		props: CheckboxProps,
		options: componentOptions,
		emits: ['update:value', 'update:modelValue', 'change'],
		setup(props, context) {
			const {
				isArray
			} = Array;

			const [innerValue, setInnerValue] = useDefault(
				props,
				context.emit,
				'value',
				'change',
			);

			const optionList = getOptions(props, context.slots);
			// const optionList = getOptions([])

			// watch(props.options, (options) => {
			// 	if (!options) return [];
			// 	optionList.value = options.map((item) => {
			// 		const isLabel = ['number', 'string'].includes(typeof item);
			// 		return isLabel ? {
			// 			label: `${item}`,
			// 			value: item,
			// 			checked: props.value?.includes(item),
			// 		} : {
			// 			...item,
			// 			checked: props.value?.includes(item.value)
			// 		};
			// 	});
			// }, {
			// 	immediate: true
			// }, )

			const checkedSet = computed(() => {
				if (isArray(innerValue.value)) {
					return new Set(innerValue.value);
				}
				return new Set();
			});
			const checkAllStatus = setCheckAllStatus(optionList, innerValue, checkedSet);

			const maxExceeded = computed(() => {
				return props.max !== undefined && innerValue.value.length === props.max;
			});

			const onCheckedChange = (p) => {
				const {
					checked,
					checkAll,
					e
				} = p;
				if (checkAll) {
					onCheckAllChange(checked, {
						e
					});
				} else {
					handleCheckboxChange(p);
				}
			};

			const handleCheckboxChange = (data) => {
				const currentValue = data.option.value;
				if (isArray(innerValue.value)) {
					if (currentValue === undefined) {
						return;
					}
					const val = [...innerValue.value];
					if (data.checked) {
						val.push(currentValue);
					} else {
						const i = val.indexOf(currentValue);
						val.splice(i, 1);
					}
					setInnerValue(val, {
						e: data.e,
						current: data.option.value,
						type: data.checked ? 'check' : 'uncheck',
					});
				} else {
					console.warn(
						`TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`
					);
				}
			};
			const getAllCheckboxValue = () => {
				const val = new Set();
				for (let i = 0, len = optionList.value.length; i < len; i++) {
					const item = optionList.value[i];
					if (item.checkAll) continue;
					if (item.value === undefined) continue;
					val.add(item.value);
					if (maxExceeded.value) break;
				}
				return [...val];
			};
			const onCheckAllChange = (checked, context) => {
				const value = checked ? getAllCheckboxValue() : [];
				setInnerValue(value, {
					e: context.e,
					type: checked ? 'check' : 'uncheck',
					current: undefined,
				});
			};

			provide('checkboxGroup', {
				...toRefs(props),
				innerValue,
				checkAllStatus,
				checkedSet,
				onCheckedChange,
			});


			return {
				prefix,
				classPrefix: componentName,
				optionList
			}
		}
	})
</script>

<style>
</style>