<template>
	<view :class="rootClass">
		// #ifdef H5
		<component :is="avatarItems"></component>
		// #endif
		// #ifdef MP-WEIXIN
		<slot></slot>
		// #endif
		<!-- 自定义折叠元素 -->
		<view :class="`${classPrefix}__collapse--slot`">
			<slot name="collapse-avatar" />
		</view>
		<view :class="`${classPrefix}__collapse--default`" v-if="isShowEllipsisContent">
			<t-avatar :icon="collapseAvatar ? '' : 'user-add'" :size="size">
				{{ellipsisContent}}
			</t-avatar>
		</view>
	</view>
</template>

<script>
	import {
		provide,
		defineComponent,
		computed,
		ref,
		getCurrentInstance,
		Fragment
	} from "vue"
	import {
		onReady
	} from '@dcloudio/uni-app'
	import AvatarGroupProps from './props'
	import IAvatar from '../avatar'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-avatar-group`;
	export default defineComponent({
		name,
		components: {
			[IAvatar.name]: IAvatar
		},
		options: componentOptions,
		props: AvatarGroupProps,
		setup(props, {
			slots
		}) {
			provide('avatarGroup', {
				...props
			});
			const internalInstance = getCurrentInstance();

			const direction = props.cascading ? props.cascading.split('-')[0] : 'right';
			const rootClass = computed(() => [
				`${name}`,
				`${name}-offset-${direction}-${props.size.indexOf('px') > -1 ? 'medium' : props.size}`,
			]);
			const isShowEllipsisContent = ref(false);
			const ellipsisContent = ref(null);
			const size = ref(props.size);
			// #ifdef H5
			//适用H5
			const avatarItems = () => {
				const childContent = slots.default ? slots.default() : [];
				let children = [];
				childContent.forEach((child) => {
					if (child.type === Fragment) {
						children.push(...child.children);
					} else {
						children.push(child);
					}
				});
				let childrenShow = [];
				const max = props.max || 0;
				if (max && max < children.length) {
					childrenShow = children.slice(0, max);
					isShowEllipsisContent.value = true;
					ellipsisContent.value = props.collapseAvatar || `+${children.length - max}`;
				} else {
					childrenShow = children;
				}
				size.value = childrenShow[0].size || props.size;
				if (props.cascading === 'left-up') {
					childrenShow.forEach((item, index) => {
						const defaultZIndex = 100;
						childrenShow[index].props.style = `z-index: ${defaultZIndex - index * 10}`;
					});
				}
				return childrenShow;
			}
			// #endif

			// #ifdef MP-WEIXIN
			//微信端渲染子组件，更改zIndex
			const handleChildCascading = () => {
				if (props.cascading === 'right-up') return;

				const defaultZIndex = 100;
				const children = internalInstance.ctx.$children;
				children.forEach((child, index) => {
					child.updateCascading(defaultZIndex - index * 10);
				});
			}
			const handleMax = () => {
				const max = props.max || 0;
				const children = internalInstance.ctx.$children;
				if (!max || max > children.length) return;

				isShowEllipsisContent.value = true;
				ellipsisContent.value = props.collapseAvatar || `+${children.length - max}`;

				const restAvatars = children.splice(max, children.length - max);

				console.log(restAvatars)

				restAvatars.forEach((child) => {
					child.hide();
				});
			}


			onReady(() => {
				handleMax()
				handleChildCascading()
			})
			// #endif
			return {
				classPrefix: name,
				rootClass,
				isShowEllipsisContent,
				ellipsisContent,
				// #ifdef H5
				avatarItems
				// #endif
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/avatarGroup.less";
</style>