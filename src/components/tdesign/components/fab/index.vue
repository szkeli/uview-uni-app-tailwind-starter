<template>
	<view :class="classes" :style="style">
		<t-button size="large" theme="primary" :class="`${classPrefix}__button`" v-bind="btnProps" :icon="icon"
			@click="onClick">{{text}}</t-button>
	</view>
</template>


<script>
	import {
		computed,
		toRefs,
		defineComponent
	} from "vue"
	import config from '../../common/config';
	import FabProps from './props'
	import TButton from '../button'
	import {
		useEmitEvent
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-fab`;
	export default defineComponent({
		name,
		props: FabProps,
		options: componentOptions,
		components: {
			[TButton.name]: TButton,
		},
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit)
			const classes = computed(() => ({
				[`${name}`]: true,
			}));
			const btnProps = computed(() => ({
				shape: props.text ? 'round' : 'circle',
				...props.buttonProps
			}));

			const onClick = (e) => emitEvent('click', {
				e
			});

			return {
				classPrefix: name,
				...toRefs(props),
				classes,
				btnProps,
				onClick
			}
		}

	})
</script>

<style lang="less" :scoped="false">
	@import "./style/fab.less";
</style>