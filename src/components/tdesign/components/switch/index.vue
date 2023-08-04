<template>
	<view :class="classes" @tap="handleToggle">
		<view :class="bodyClasses">
			<view :class="dotClasses">
				<view :class="labelClasses">
					<t-loading v-if="loading" inherit-color size="32rpx" />
					<text v-else-if="label.length == 2">{{isChecked ? label[0] : label[1]}}</text>
					<t-icon v-else="icon.length == 2" :name="isChecked ? icon[0] : icon[1]" :class="iconClassess" />
				</view>
			</view>
		</view>
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
	import SwitchProps from './props';
	import Icon from "../icon"
	import Loading from '../loading';
	import {
		useDefault,
		useToggle,
		useFormDisabled
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-switch`;
	export default defineComponent({
		name: componentName,
		components: {
			[Icon.name]: Icon,
			[Loading.name]: Loading
		},
		options: componentOptions,
		props: SwitchProps,
		emits: ['update:value', 'update:modelValue', 'change'],
		setup(props, context) {

			const disabled = useFormDisabled();
			const switchValues = props.customValue || [true, false];
			const [innerValue] = useDefault(props, context.emit, 'value',
				'change');
			const {
				state,
				toggle
			} = useToggle(switchValues, innerValue.value)

			const isChecked = computed(() => innerValue.value === switchValues[0]);

			const classes = computed(() => [
				`${componentName}`,
				`${componentName}--${props.size}`,
				{
					[`${componentName}--checked`]: isChecked.value,
					[`${componentName}--disabled`]: disabled.value || props.loading,
				},
			]);

			const bodyClasses = computed(() => [
				`${componentName}__body`,
				`${componentName}__body--${props.size}`,
				{
					[`${componentName}__body--checked`]: isChecked.value,
					[`${componentName}__body--plain`]: props?.label?.length !== 2 && props?.icon
						?.length !==
						2 && !props?.loading,
				},
			])

			const dotClasses = computed(() => [
				`${componentName}__dot`,
				`${componentName}__dot--${props.size}`,
				{
					[`${componentName}__dot--checked`]: isChecked.value,
					[`${componentName}__dot--plain`]: props?.label?.length !== 2 && props?.icon?.length !==
						2 && !props?.loading,
				}
			])

			const labelClasses = computed(() => [
				`${componentName}__label`,
				`${componentName}__label--${props.size}`,
				{
					[`${componentName}__label--checked`]: isChecked.value,
				},
			]);

			const iconClassess = computed(() => [
				`${componentName}__icon`,
				`${componentName}__icon--${props.size}`,
				{
					[`${componentName}__icon--checked`]: isChecked.value,
				},
			])


			const handleToggle = () => {
				if (disabled.value) {
					return;
				}
				toggle();
				innerValue.value = state.value;
			}



			return {
				classPrefix: componentName,
				classes,
				bodyClasses,
				dotClasses,
				labelClasses,
				iconClassess,
				handleToggle,
				isChecked
			}

		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/switch.less";
</style>