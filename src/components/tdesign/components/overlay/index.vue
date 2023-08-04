<template>
	<view v-show="visible" :class="rootClasss" :style="rootStyles" @click="handleClick"
		@touchmove.stop="handleTouchMove">
		<slot></slot>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent
	} from "vue"
	import OverlayProps from './props'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-overlay`;
	export default defineComponent({
		name,
		props: OverlayProps,
		emits: ['click', 'update:visible'],
		options: componentOptions,
		setup(props, {
			emit
		}) {
			const rootClasss = computed(() => ({
				[`${name}`]: true,
				[`${name}--active`]: props.visible,
			}));

			const rootStyles = computed(() => {
				let arr = [];
				if (props.customStyle) {
					arr.push(props.customStyle)
				}
				if (props.zIndex) {
					arr.push(`z-index: ${props.zIndex}`);
				}
				if (props.duration) {
					arr.push(`transition-duration: ${props.duration}ms`);
				}
				if (props.backgroundColor) {
					arr.push(`background-color: ${props.backgroundColor}`);
				}
				return arr.join('; ');
			})

			const handleTouchMove = (e) => {
				if (props.preventScrollThrough) {
					e.stopPropagation();
					e.preventDefault();
				}
			};
			//关闭遮罩层
			const handleClick = (e) => {
				emit('click', e);
				if (props.closeOnClickOverlay) {
					emit('update:visible', false);
				}
			};
			return {
				name,
				rootClasss,
				rootStyles,
				handleClick,
				handleTouchMove,
			};
		}

	})
</script>

<style lang="less" :scoped="false">
	@import './style/overlay.less';
</style>