<template>
	<view :class="classPrefix">
		<slot v-if="!(options && options.length)" />
		<template v-else>
			<t-radio v-for="(opt, idx) in groupOptions" :key="`radio-group-options-${idx}-${Math.random()}`"
				:name="name" :icon="icon" :checked="value === opt[keys?.value ?? 'value']"
				:disabled="'disabled' in opt ? opt.disabled : disabled" :value="opt[keys?.value ?? 'value']"
				:label="opt[keys?.label ?? 'label']"></t-radio>
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
	import Radio from "../radio"
	import RadioProps from './props';
	import {
		useDefault
	} from '../../shared';

	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-radio-group`;
	export default defineComponent({
		name: componentName,
		components: {
			[Radio.name]: Radio,
		},
		props: RadioProps,
		options: componentOptions,
		emits: ['update:value', 'update:modelValue', 'change'],
		setup(props, context) {
			const [groupValue, setGroupValue] = useDefault(
				props,
				context.emit,
				'value',
				'change',
			);

			const groupOptions = computed(() => {
				const {
					options,
					value,
					keys
				} = props;
				// 数字数组｜字符串数组｜对像数组
				if (!options?.length || !Array.isArray(options)) {
					return [];
				}
				return options?.map((option) => {
					const typeName = typeof option;
					if (typeName === 'number' || typeName === 'string') {
						return {
							label: `${option}`,
							value: option,
							checked: value === option,
						}
					} else if (typeName === 'object') {
						return {
							...option,
							label: option[keys?.label ?? 'label'],
							value: option[keys?.value ?? 'value'],
							checked: value === option[keys?.value ?? 'value'],
						}
					}
				});
			});

			const handleRadioChange = (val, e) => {
				if (val === groupValue.value) {
					setGroupValue('', {
						e
					});
				} else {
					setGroupValue(val, {
						e
					});
				}
			};

			provide('rootGroupProps', props);
			provide('rootGroupValue', groupValue);
			provide('rootGroupChange', handleRadioChange);


			return {
				prefix,
				classPrefix: componentName,
				groupOptions,
				handleRadioChange
			}
		}
	})
</script>

<style>
</style>