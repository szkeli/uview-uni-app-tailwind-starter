<template>
	<!--加载中占位符-->
	<view v-if="isLoading"
		:class="[classPrefix, `${classPrefix}__mask`, `${classPrefix}--loading`, `${classPrefix}--shape-${shape}`]"
		:style="imageStyle">
		<t-loading v-if="loading === 'default'" theme="dots" size="44rpx" loading inherit-color
			:t-class="`${prefix}-class-load`" :t-class-text="`${classPrefix}--loading-text`"></t-loading>
		<view v-else-if="loading !== '' && loading !== 'slot'"
			:class="[`${classPrefix}__common`, `${prefix}-class-load`]">
			{{loading}}
		</view>
		<slot v-else name="loading" />
	</view>
	<!--加载失败中占位符-->
	<view v-if="isError  && !isLoading"
		:class="[ `${classPrefix}__mask`, `${classPrefix}--failed` ,`${classPrefix}--shape-${shape}`]"
		:style="imageStyle">
		<view v-if="error === 'default'" style="font-size: 44rpx" :class="`${prefix}-class-load`">
			<t-icon name="close" aria-role="img" />
		</view>
		<view v-else-if="error && error !== 'slot'" :class="[`${classPrefix}__common`,`${prefix}-class-load`]">
			{{error}}
		</view>
		<slot v-else name="error" />
	</view>
	<!-- 图片 -->
	<image ref="imageDOM" v-show="!isError && !isLoading" :class="[classPrefix, `${classPrefix}--shape-${shape}`]"
		:src="realSrc" :mode="mode" :webp="webp" :lazy-load="lazy" @error="onLoadError" @load="onLoaded"
		:show-menu-by-longpress="showMenuByLongpress" :style="imageStyle" />
</template>

<script>
	import {
		computed,
		defineComponent,
		ref,
		unref,
		getCurrentInstance,
		watch
	} from "vue"
	import ImageProps from './props'
	import Loading from "../loading"
	import Icon from "../icon"
	import {
		useEmitEvent
	} from '../../shared';
	import {
		addUnit
	} from '../../common/libs/utils'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-image`;
	export default defineComponent({
		name,
		props: ImageProps,
		options: componentOptions,
		components: {
			[Icon.name]: Icon,
			[Loading.name]: Loading
		},
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit);
			// 记录图片的loading、error状态
			const isLoading = ref(true);
			const isError = ref(false);

			// 图片懒加载
			const imageDOM = ref();
			const realSrc = ref('');

			watch(() => props.src, (value) => {
				if (value) {
					realSrc.value = props.src;
				} else {
					isLoading.value = true;
					isError.value = false;
				}
			}, {
				immediate: true
			})





			const onLoadError = (e) => {
				isLoading.value = false;
				isError.value = true;
				emitEvent('error', e);

			}

			const onLoaded = (e) => {
				isLoading.value = false;
				isError.value = false;
				emitEvent('load', e);
			}
			const imageStyle = computed(() => {
				const {
					width,
					height,
					style
				} = props;
				let innerStyle = {};
				if (width) {
					innerStyle.width = addUnit(width);
				}
				if (height) {
					innerStyle.height = addUnit(height);
				}
				return innerStyle
			})

			return {
				prefix: prefix,
				classPrefix: name,
				imageDOM,
				realSrc,
				isLoading,
				imageStyle,
				isError,
				onLoadError,
				onLoaded
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import './style/image.less';
</style>