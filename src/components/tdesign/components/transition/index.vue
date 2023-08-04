<template>
	<view v-show="isShow" ref="aniRef" :animation="animationData" :class="customClass" :style="transformStyles"
		@click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		onMounted,
		reactive,
		ref,
		watch
	} from "vue"
	import TransitionaProps from './props';
	import {
		useAnimation
	} from './useAnimation'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-transition`;
	export default defineComponent({
		name: componentName,
		options: componentOptions,
		emits: ['click', 'change'],
		props: TransitionaProps,
		setup(props, ctx) {
			const {
				aniRef,
				animationData,
				isShow,
				transform,
				toLine,
				opacity,
				open,
				close
			} = useAnimation(props, ctx);


			const transformStyles = computed(() => {
				let styles = {
					...props.styles,
					'transition-duration': props.duration / 1000 + 's'
				};
				let transformSty = ''
				for (let i in styles) {
					let line = toLine(i)
					transformSty += line + ':' + styles[i] + ';'
				}
				return 'transform:' + transform.value + ';' + 'opacity:' + opacity.value + ';' + transformSty
			})


			watch(
				() => props.show,
				(val) => {
					if (val) {
						open({
							duration: props.duration,
							timingFunction: 'ease',
							transformOrigin: '50% 50%',
							delay: 0
						});
					} else {
						//避免上来就执行 close,导致动画错乱
						if (isShow.value) {
							close()
						}
					}
				}, {
					immediate: true
				});


			//点击组件触发回调
			const handleClick = () => {
				ctx.emit('click', {
					detail: isShow.value
				})
			}

			return {
				isShow,
				aniRef,
				transformStyles,
				animationData,
				handleClick
			}

		}
	})
</script>

<style>
</style>