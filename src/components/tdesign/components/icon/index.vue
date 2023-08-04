<template>
	<view :class="rootClass" :style="iconStyle" @click="onClick">
		<view v-if="isImage" :class="`${classPrefix}--image`">
			<image :src="name" mode="aspectFit" :class="`${classPrefix}__image`" />
		</view>
		<text v-if="!prefix" :class="[ `${prefix ? prefix : classPrefix }-${ name }`, `${ classPrefix }-base`]">
		</text>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		unref
	} from "vue"
	import config from '../../common/config';
	import IconProps from './props'
	import {
		addUnit
	} from '../../common/libs/utils'
	import {
		useEmitEvent
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-icon`;
	export default defineComponent({
		name,
		props: IconProps,
		emits: ['click'],
		options: componentOptions,
		setup(props, context) {
			const componentPrefix = prefix;
			const rootClass = computed(() => {
				const {
					prefix
				} = props;
				let classList = [prefix ? prefix : name];
				if (prefix) { //自定义iconfont 图标，是在root节点上设置
					classList.push(`${prefix}-${props.name}`)
				}
				return classList;
			})

			const isImage = computed(() => props.name.indexOf('/') !== -1)

			const iconStyle = computed(() => {
				const {
					name,
					color,
					size
				} = props;
				const sizeValue = addUnit(size);
				const sizeStyle = unref(isImage) ? {
					width: sizeValue,
					height: sizeValue
				} : {};
				const colorStyle = color ? {
					color: color
				} : {};
				const fontStyle = size ? {
					'font-size': sizeValue
				} : {};

				return {
					...colorStyle,
					...fontStyle,
					...sizeStyle,
					...props.customStyle
				}

			})
			const emitEvent = useEmitEvent(props, context.emit)
			const onClick = (e) => {
				emitEvent('click', e);
			}

			return {
				classPrefix: name,
				componentPrefix,
				rootClass,
				iconStyle,
				isImage,
				onClick
			}
		}

	})
</script>

<style lang="less" :scoped="false">
	@import './style/icon.less';
</style>