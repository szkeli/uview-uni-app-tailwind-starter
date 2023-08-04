<template>
	<view :class="rootClass">
		<view v-if="title" :class="`${classPrefix}__title`">
			<slot name="title">{{ title }}</slot>
		</view>
		<slot />
	</view>
</template>

<script>
	import {
		computed,
		defineComponent
	} from "vue"
	import CellGroupProps from './props'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-cell-group`;
	export default defineComponent({
		name,
		options: componentOptions,
		props: CellGroupProps,
		setup(props) {
			const rootClass = computed(() => [name, `${name}--${props.theme}`, props.bordered ?
				`${name}--bordered` : ''
			]);

			return {
				classPrefix: name,
				rootClass
			}
		}
	})
</script>

<style lang="less" scoped="false">
	@import "./style/cellGroup.less";
</style>