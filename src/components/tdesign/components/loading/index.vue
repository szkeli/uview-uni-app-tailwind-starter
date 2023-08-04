<template>
	<view :class="rootClass" :style="rootStyle">
		<view v-if="indicator && realLoading" :style="animationStyle" :class="loadingClass">
			<block v-if="theme === 'spinner'">
				<view v-for="index in 12" :key="index" :class="`${name}__dot`"></view>
			</block>
			<view v-if="theme === 'circular'" :class="`${name}__circular`"></view>
			<block v-if="theme === 'dots'">
				<view :class="`${name}__dot`"
					:style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: 0s` : ''">
				</view>
				<view :class="`${name}__dot`"
					:style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: ${(duration * 1) / 3000}s` : ''">
				</view>
				<view :class="`${name}__dot`"
					:style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: ${(duration * 2) / 3000}s` : ''">
				</view>
			</block>
			<slot name="indicator" />
		</view>

		<view :class="textClass">
			<text v-if="text && realLoading" :class="textClass">
				{{text}}
			</text>
			<block v-else>
				<slot name="text" />
			</block>
		</view>

	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		ref,
		toRefs,
		unref,
		watch
	} from "vue"
	import config from '../../common/config';
	import LoadingProps from './props'
	import {
		addUnit,
		cls
	} from '../../common/libs/utils'
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-loading`;
	export default defineComponent({
		name,
		props: LoadingProps,
		options: componentOptions,
		setup(props) {
			const internalInstance = getCurrentInstance();
			const delayShowLoading = ref(false)


			const {
				pause
			} = toRefs(props);

			const countDelay = () => {
				delayShowLoading.value = false;
				const timer = setTimeout(() => {
					delayShowLoading.value = true;
					clearTimeout(timer);
				}, props.delay)
			}

			const realLoading = computed(() => (!props.delay || delayShowLoading.value))

			watch(() => props.loading, (value) => {
				if (value) {
					props.delay && countDelay()
				}
			}, {
				immediate: true
			})

			const rootClass = computed(() => [name, {
				[`${name}--vertical`]: props.layout === 'vertical'
			}])

			const textClass = computed(() => [
				`${name}__text`,
				props.tClassText,
				cls(name + '__text', [props.layout]),
			]);





			const rootStyle = computed(() => {
				const style = [];
				if (props.inheritColor) {
					style.push('color: inherit');
				}
				if (props.size) {
					style.push(`font-size: ${props.size};`);
				}
				return style.join(';');
			});

			const loadingClass = computed(() => [`${prefix}-class-indicator`, `${name}__spinner`,
				`${name}__spinner--${props.theme}`, props.reverse ? 'reverse' : ''
			]);

			const animationStyle = computed(() => {
				const ans = {};
				if (props.pause) {
					ans['animation-play-state'] = 'paused';
				}
				if (props.reverse) {
					ans['animation-direction'] = 'reverse';
				}
				if (props.duration) {
					ans['animation-duration'] = `${props.duration}ms`;
				}
				if (props.size) {
					ans.width = props.size;
					ans.height = props.size;
				}
				if (props.inheritColor) {
					ans.color = 'inherit';
				}
				return ans;
			});



			return {
				name,
				prefix,
				pause,
				rootClass,
				textClass,
				rootStyle,
				loadingClass,
				animationStyle,
				realLoading,
				addUnit,
				cls
			};
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/loading.less";
</style>