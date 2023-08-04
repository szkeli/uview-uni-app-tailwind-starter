<template>
	<navigator :class="linkClass" :target="navigatorProps.target || 'self'" :url=" disabled || !href ? undefined : href"
		:open-type="navigatorProps.openType || 'navigate'" :delta="navigatorProps.delta"
		:hover-stop-propagation="navigatorProps.hoverStopPropagation" :hover-start-time="navigatorProps.hoverStartTime"
		:hover-class="hoverClass" :hover-stay-time="navigatorProps.hoverStayTime">
		<view v-if="prefixIcon" :class="`${classPrefix}__prefix-icon`">
			<slot name="prefix-icon" />
			<t-icon :name="prefixIcon"></t-icon>
		</view>
		<view :class="`${classPrefix}__content`">
			<block v-if="content">{{content}}</block>
			<slot name="content" />
			<slot />
		</view>
		<view v-if="suffixIcon" :class="`${classPrefix}__suffix-icon`">
			<slot name="suffix-icon" />
			<t-icon :name="suffixIcon"></t-icon>
		</view>
	</navigator>
</template>

<script>
	import {
		computed,
		defineComponent
	} from "vue"
	import config from '../../common/config';
	import LinkProps from './props';
	import Icon from "../icon"
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-link`;
	export default defineComponent({
		name,
		props: LinkProps,
		options: componentOptions,
		components: {
			[Icon.name]: Icon,
		},
		setup(props) {
			const classPrefix = name;


			const linkClass = computed(() => {
				const {
					theme,
					size,
					underline,
					navigatorProps,
					disabled,
					href
				} = props;
				let classList = [name, `${name}--${theme}`, `${name}--${size}`];
				if (underline) {
					classList.push(`${name}--underline`);
				}
				if (disabled) {
					classList.push(`${name}--disabled`);
				}

				return classList
			})

			const hoverClass = computed(() => {
				const {
					hover,
					disabled,
					navigatorProps
				} = props;
				let classList = [hover && !disabled && classPrefix + '--hover']
				if (navigatorProps.hoverClass) {
					classList.push(navigatorProps.hoverClass)
				}
				return classList.join(' ')
			})


			return {
				prefix,
				classPrefix,
				linkClass,
				hoverClass
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/link.less";
</style>