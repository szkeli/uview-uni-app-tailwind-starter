<template>
	<view :class="styleWrapper" @click="handleChange">
		<view v-if="icon" :class="{
		        [`${classPrefix}__icon`]: true,
		        [`${classPrefix}__icon--${placement}`]: true,
		        [`${classPrefix}__icon--checked`]: isChecked,
		        [`${classPrefix}__icon--disabled`]: isDisabled,
		      }">
			<view v-if="isIconArray" :class="`${name}__icon`">
				<image :src="isChecked ? indeterminate && icon[2] ? icon[2] : icon[0] : icon[1]"
					:class="`${classPrefix}__icon-image`" webp />
			</view>
			<template v-else>
				<t-icon v-if="isChecked && (icon == 'circle' || icon == 'rectangle')"
					:name="indeterminate ? ('minus-' + icon + '-filled') : ('check-' + icon + '-filled')"
					:class="`${classPrefix}__icon-wrapper`" />
				<t-icon v-if="isChecked && icon == 'line'"
					:name="indeterminate ? ('minus-' + icon + '-filled') : 'check'"
					:class="`${classPrefix}__icon-wrapper`" />
				<view v-else-if="!isChecked && (icon == 'circle' || icon == 'rectangle')" :class="{
						 [`${classPrefix}__icon-circle`]: icon === true,
						[`${classPrefix}__icon-${icon}`]: typeof icon === 'string',
						[`${classPrefix}__icon-${icon}--disabled`]: isDisabled,
					}">

				</view>
				<view v-if="!isChecked && icon == 'line'" class="placeholder"></view>
			</template>
		</view>
		<div :class="`${classPrefix}__content`" @click.stop="(e) => handleChange(e, 'text')">
			<div :class="{
		          [`${classPrefix}__title`]: true,
		          [`${classPrefix}__title--checked`]: isChecked,
		          [`${classPrefix}__title--disabled`]: isDisabled,
		        }" :style="{ '-webkit-line-clamp': maxLabelRow }">
				{{label}}
				<slot />
				<slot name="label" />
			</div>
			<div :class="{
		          [`${classPrefix}__description`]: true,
		          [`${classPrefix}__description--disabled`]: isDisabled,
		        }" :style="{ '-webkit-line-clamp': maxContentRow }">
				{{content}}
				<slot name="content" />
			</div>
		</div>
		<view v-if="borderless" :class="`${classPrefix}__border ${classPrefix}__border--${placement}`"></view>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		inject,
		toRefs
	} from "vue"
	import config from '../../common/config';
	import CheckboxProps from './props';
	import Icon from "../icon"
	import {
		useDefault
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-checkbox`;
	export default defineComponent({
		name: componentName,
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		props: CheckboxProps,
		emits: ['update:checked', 'update:modelValue', 'change'],
		setup(props, context) {
			const [innerChecked, setInnerChecked] = useDefault(
				props,
				context.emit,
				'checked',
				'change',
			);
			const internalInstance = getCurrentInstance();
			const checkboxGroup = inject('checkboxGroup', undefined)

			const indeterminate = computed(() => {
				if (props.checkAll && checkboxGroup != null) return checkboxGroup.checkAllStatus.value ===
					'indeterminate';
				return props.indeterminate;
			});

			const isIconArray = Array.isArray(props.icon);

			const isChecked = computed(() => {
				if (props.checkAll) {
					const checkAllStatus = checkboxGroup?.checkAllStatus.value;
					return checkAllStatus === 'checked' || checkAllStatus === 'indeterminate';
				}
				if (checkboxGroup != null && props.value != null) {
					return !!checkboxGroup.checkedSet.value?.has(props.value);
				}
				return innerChecked.value;
			});

			const styleWrapper = computed(() => ({
				[componentName]: true,
				[`${componentName}--${props.placement}`]: true,
				[`${componentName}--checked`]: isChecked,
				[`${componentName}--block`]: props.block,
			}));

			const isDisabled = computed(() => {
				if (checkboxGroup?.max.value)
					return checkboxGroup.max.value <= checkboxGroup.innerValue.value.length && !isChecked
						.value;
				if (props.disabled != null) return props.disabled;
				return !!checkboxGroup?.disabled.value;
			});

			const handleChange = (e, source) => {
				if (isDisabled.value) return;
				if (source === 'text' && props.contentDisabled) return;

				const value = !isChecked.value;
				setInnerChecked(value, {
					e
				});
				e.stopPropagation();
				if (checkboxGroup && checkboxGroup?.onCheckedChange) {
					checkboxGroup.onCheckedChange({
						checked: value,
						checkAll: props.checkAll,
						e,
						option: props
					});
				}
			};

			return {
				classPrefix: componentName,
				...toRefs(props),
				styleWrapper,
				isDisabled,
				isChecked,
				handleChange,
				isIconArray,
				indeterminate
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/checkbox.less";
</style>