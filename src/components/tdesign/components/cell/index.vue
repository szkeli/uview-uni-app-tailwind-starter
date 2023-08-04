<template>
	<view :class="rootClass" :hover-class="hover ? classPrefix + '--hover' : ''" hover-stay-time="70" @tap="onClick">
		<view :class="[`${classPrefix}__left`,`${prefix}-class-left`]">
			<t-icon v-if="leftIcon " :name="leftIcon"
				:class="[`${classPrefix}__left-icon` ,`${prefix}-class-left-icon`]" />
			<slot name="leftIcon" />
			<t-image v-if=" image " shape="round" width="3rem" height="3rem"
				:t-class="`${classPrefix}__left-image ${prefix}-class-image`" :src="image" />
			<slot name="image" />
		</view>
		<view :class="`${classPrefix}__title`">
			<view :class="[`${classPrefix}__title-text`,`${prefix}-class-title`]">
				<block v-if=" title "> {{ title}} </block>
				<slot name="title" />
				<block v-if="required">
					<text decode :class="`${classPrefix}--required`">&nbsp;*</text>
				</block>
			</view>

			<view :class="[`${classPrefix}__description`,`${prefix}-class-description`]">
				<view v-if="description" :class="`${classPrefix}__description-text`">{{description}}</view>
				<slot name="description" />
			</view>
		</view>
		<view :class="[`${classPrefix}__note`,`${prefix}-class-note`]">
			<text v-if=" note ">{{note}}</text>
			<slot name="note" />
		</view>
		<view :class="[`${classPrefix}__right`, `${prefix}-class-right`]">
			<t-icon v-if=" arrow " name="chevron-right"
				:class="[`${classPrefix}__right-icon` ,`${prefix}-class-right-icon`]" />
			<block v-else>
				<t-icon :name="rightIcon" :class="[`${classPrefix}__right-icon`,`${prefix}-class-right-icon`]" />
				<slot name="rightIcon" />
			</block>
		</view>
	</view>
</template>

<script>
	import {
		computed,
		defineComponent
	} from "vue"
	import CellProps from './props'
	import {
		useEmitEvent,
		useFormDisabled
	} from '../../shared';
	import Icon from "../icon"
	import Image from "../image"
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-cell`;
	export default defineComponent({
		name,
		props: CellProps,
		options: componentOptions,
		components: {
			[Icon.name]: Icon,
			[Image.name]: Image
		},
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit)
			const disabled = useFormDisabled();
			const rootClass = computed(() => [
				`${name}`,
				`${name}--${props.align}`,
				{
					[`${name}--hover`]: props.hover && disabled.value,
					[`${name}--borderless`]: !props.bordered,
				},
			]);

			const onClick = (e) => {
				if (!disabled.value) {
					emitEvent('click', e);
					jumpLink()
				}
			};

			const jumpLink = (urlKey = 'url', link = 'jumpType') => {
				const url = props[urlKey];
				const jumpType = props[link];
				if (url) {
					uni[jumpType]({
						url
					});
				}
			}

			return {
				prefix,
				classPrefix: name,
				rootClass,
				onClick
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/cell.less";
</style>