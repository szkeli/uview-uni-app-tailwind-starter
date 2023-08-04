<template>
	<view :class="radioClasses" @click="handleChange">
		<view :class="iconClass">
			<!-- 自定义图片图标 -->
			<view v-if="isIconArray" :class="`${classPrefix}__image`">
				<image :src="isChecked ? iconVal[0] : iconVal[1]" :class="`${classPrefix}-icon__image`" webp />
			</view>
			<template v-else>
				<t-icon v-if="isChecked && (icon == 'circle' || icon == 'line')"
					:name="icon=='circle' ?  'check-circle-filled' : 'check'"
					:class="`${classPrefix}__icon-wrap`"></t-icon>
				<view v-if="isChecked && icon == 'dot'"
					:class="[`${classPrefix}__icon-${icon}`, { [`${classPrefix}__icon-${icon}--disabled`]: disabled }]">
				</view>
				<view v-if="!isChecked && (icon == 'circle' || icon == 'dot')"
					:class="[`${classPrefix}__icon-circle`, { [`${classPrefix}__icon-circle--disabled`]: disabled }]">
				</view>
				<!-- line && unchecked 为空 需要展位元素 -->
				<div v-if="!isChecked && icon == 'line'" class="placeholder" />
			</template>
		</view>
		<view :class="`${classPrefix}__content`" data-target="text" @click.stop="handleContentChange">
			<view :class="titleClasses" style="-webkit-line-clamp:{{maxLabelRow}}">
				{{label}}
				<slot />
				<slot name="label" />
			</view>

			<div :class="{
			      [`${classPrefix}__description`]: true,
			      [`${classPrefix}__description--disabled`]: disabled,
			    }" :style="{ '-webkit-line-clamp': maxContentRow }">
				{{content}}
				<slot name="content" />
			</div>
		</view>
		<view v-if="borderless" :class="`${classPrefix}__border ${classPrefix}__border--${finalPlacement}`"></view>
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
	import RadioProps from './props';
	import Icon from "../icon"
	import {
		useDefault,
		NOOP,
		useVModel,
		useFormDisabled
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-radio`;
	export default defineComponent({
		name: componentName,
		components: {
			[Icon.name]: Icon,
		},
		options: componentOptions,
		props: RadioProps,
		emits: ['update:checked', 'update:modelValue', 'change'],
		setup(props, context) {

			const {
				checked,
				modelValue,
				placement,
				block
			} = toRefs(props);

			const [innerChecked, setInnerChecked] = useVModel(
				checked,
				modelValue,
				props.defaultChecked,
				props.onChange,
				'checked',
			);


			const internalInstance = getCurrentInstance();
			const rootGroupProps = inject('rootGroupProps', {})
			const rootGroupValue = inject('rootGroupValue', undefined);
			const rootGroupChange = inject('rootGroupChange', NOOP);

			const isChecked = computed(() => innerChecked.value || props.value === rootGroupValue?.value);

			const formDisabled = useFormDisabled();

			const disabled = computed(() => {
				if (formDisabled.value == null) return rootGroupProps.disabled;
				return formDisabled.value;
			});

			const finalPlacement = computed(() => {
				if (props.placement == null && 'placement' in rootGroupProps) return rootGroupProps
					.placement;
				return props.placement || 'left';
			});


			const radioClasses = computed(() => [
				`${componentName}`,
				`${componentName}--${finalPlacement.value}`,
				{
					[`${componentName}--block`]: block.value,
				},
			]);

			const iconClass = computed(() => [
				`${componentName}__icon`,
				`${componentName}__icon--${finalPlacement.value}`,
				{
					[`${componentName}__icon--checked`]: isChecked.value,
					[`${componentName}__icon--disabled`]: disabled.value,
				},
			]);

			const titleClasses = computed(() => [
				`${componentName}__title`,
				{
					[`${componentName}__title--disabled`]: disabled.value,
				},
			]);

			const handleContentChange = (e) => {
				console.log('handleContentChange', props.contentDisabled);
				if (props.contentDisabled) {
					return;
				}
				handleChange(e);
			};

			const handleChange = (e) => {
				if (disabled.value) {
					return;
				}
				if (rootGroupChange !== NOOP && props.value !== undefined) {
					rootGroupChange(props.value, e);
				} else {
					if (!props.allowUncheck && isChecked.value) return;
					setInnerChecked(!isChecked.value, {
						e
					});
				}
			};

			const isIconArray = Array.isArray(rootGroupProps?.icon || props.icon);


			const iconVal = computed(() => isIconArray ? rootGroupProps?.icon || props.icon : [])

			return {
				classPrefix: componentName,
				radioClasses,
				isChecked,
				iconClass,
				titleClasses,
				handleContentChange,
				handleChange,
				isIconArray,
				iconVal,
				finalPlacement
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/radio.less";
</style>