<template>
	<view :class="rootClass" :style="getColStyles">
		<slot></slot>
	</view>
</template>

<script>
	import {
		computed,
		inject,
		defineComponent
	} from "vue"
	import ColProps from "./props"
	import {
		addUnit,
		cls,
		_style
	} from '../../common/libs/utils'
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-col`;

	export default defineComponent({
		name,
		props: ColProps,
		options: componentOptions,
		setup(props) {
			const gutter = inject('gutter');
			const getColStyles = computed(() => {
				if (!gutter) {
					return ''
				}
				return {
					paddingLeft: gutter / 2 + 'px',
					paddingRight: gutter / 2 + 'px'
				};
			})

			const rootClass = computed(() => {
				return {
					[name]: true,
					[name + '-gutter']: props.gutter,
					[prefix + '-col--' + props.span]: true,
					[prefix + '-col--offset-' + props.offset]: true,
				}
			})
			return {
				rootClass,
				getColStyles
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/col.less";
</style>