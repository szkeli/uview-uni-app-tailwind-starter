<template>
	<view :class="`${classPrefix}__wrapper` " v-show="isShow" :style="{zIndex:zIndex,...customSize}">
		<t-badge v-bind="customBadgeProps">
			<template #content>
				<view :class="avatarClass">
					<t-image v-if="image" :class="`${prefix}-image ${classPrefix}__image`"
						v-bind="customImageProps"></t-image>
					<t-icon v-else-if="icon" :name="icon" :class="`${classPrefix}__icon`"></t-icon>
					<view v-else :class="`${classPrefix}__text`">
						<slot />
					</view>
				</view>
			</template>
		</t-badge>
	</view>
</template>

<script>
	import {
		ref,
		computed,
		inject,
		defineComponent
	} from "vue"
	import TBadge from '../badge'
	import TImage from '../image'
	import CellGroupProps from './props'
	import config from '../../common/config';
	import CLASSNAMES from '../../shared/constants'
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-avatar`;
	export default defineComponent({
		name,
		props: CellGroupProps,
		options: componentOptions,
		components: {
			[TBadge.name]: TBadge,
			[TImage.name]: TImage
		},
		setup(props) {

			const avatarGroupProps = inject('avatarGroup', {});
			const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;

			const sizeValue = ref(props.size || (avatarGroupProps && avatarGroupProps.size));
			const sizeReValue = ref((avatarGroupProps && avatarGroupProps.size) || props.size);
			const sizeClass = `${sizeReValue.value.indexOf('px') > -1 ? 'medium' : sizeReValue.value}`;
			const avatarClass = computed(() => [
				`${name}`,
				`${name}--${sizeClass}`,
				{
					[`${name}--${props.shape}`]: props.shape,
				},
				hasAvatarGroupProps ? `${name}--border ${name}--border-${sizeClass}` : '',
			]);
			const isCustomSize = computed(() => sizeValue.value && !CLASSNAMES.SIZE[sizeValue.value]);

			const customSize = computed(() => {
				return isCustomSize.value ? {
					height: sizeValue.value,
					width: sizeValue.value,
				} : {};
			});
			const customBadgeProps = computed(() => ({
				...props.badgeProps,
			}));
			const baseImageProps = {
				src: props.image,
			};
			const customImageProps = computed(() => ({
				...props.imageProps,
				...baseImageProps,
			}));

			const zIndex = ref(0)

			//微信小程序适用
			const updateCascading = (val) => {
				zIndex.value = val;
			}
			//微信小程序适用
			const isShow = ref(true); //微信小程序
			const hide = () => {
				isShow.value = false;
			}

			return {
				prefix,
				classPrefix: name,
				hasAvatarGroupProps,
				customBadgeProps,
				avatarClass,
				customSize,
				customImageProps,
				zIndex,
				updateCascading,
				hide,
				isShow
			}
		}
	})
</script>
<style lang="less" :scoped="false">
	@import "./style/avatar.less";
</style>