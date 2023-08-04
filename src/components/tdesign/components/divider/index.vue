<template>
	<view :class="{ [`${classPrefix}--vertical-center`]: layout === 'vertical' }">
		<view :class="dividerClass" :style="`border-color:${lineColor}`">
			<view :class="`${classPrefix}__content`">
				<view v-if="content"> {{content}} </view>
				<slot v-else name="content" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		computed,
		toRefs,
		defineComponent
	} from "vue"
	import config from '../../common/config';
	import DividerProps from './props'
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-divider`;
	export default defineComponent({
		name,
		options: componentOptions,
		props: DividerProps,
		setup(props) {
			const dividerClass = computed(() => [
				`${name}`,
				`${name}--${props.layout}`,
				`${name}--${props.align}`,
				{
					[`${name}--dashed`]: props.dashed,
				},
			]);

			return {
				classPrefix: name,
				...toRefs(props),
				dividerClass
			}
		}

	})
</script>

<style lang="less" :scoped="false">
	@import "./style/divider.less";
</style>