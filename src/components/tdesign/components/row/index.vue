<template>
	<view :class="`${classPrefix}`" :style="getRowStyles">
		<slot />
	</view>
</template>

<script>
	import {
		computed,
		provide,
		defineComponent
	} from "vue"
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
	const name = `${prefix}-row`;
	export default defineComponent({
		name,
		options: componentOptions,
		props: {
			gutter: {
				type: [String, Number],
				default: ''
			}
		},
		setup(props) {
			const getRowStyles = computed(() => {
				if (!props.gutter) {
					return '';
				}

				return _style({
					'margin-right': addUnit(-props.gutter / 2),
					'margin-left': addUnit(-props.gutter / 2),
				});
			})
			provide('gutter', props.gutter);
			return {
				classPrefix: name,
				getRowStyles
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	.t-row {
		display: flex;
		align-items: center;
	}

	.t-row:after {
		clear: both;
		content: '';
		display: table;
	}
</style>