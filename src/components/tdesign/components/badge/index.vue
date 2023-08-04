<template>
	<view :class="badgeClasses">
		<view :class="`${classPrefix}__content`">
			<slot name="content" v-if="!content" :class="`${classPrefix}__content-slot`" ></slot>
			<text v-else :class="`${classPrefix}__content-text`">{{content}}</text>
		</view>
		<view v-if="isShowBadge" :class="badgeInnerClasses" :style="badgeStyles">
			<view v-if="shape === 'ribbon'" :class="`${classPrefix}__ribbon--before`"
				:style="color ? `border-color: ${color}` : ''" />
			{{ badgeValue }}
			<view v-if="shape === 'ribbon'" :class="`${classPrefix}__ribbon--after`"
				:style="color ? `border-color: ${color}` : ''" />
		</view>
		<slot name="count"></slot>
	</view>
</template>

<script>
	import {
		computed,
		toRefs,
		defineComponent
	} from "vue"
	import config from '../../common/config';
	import BadgeProps from './props'
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-badge`;
	export default defineComponent({
		name,
		props: BadgeProps,
		options: componentOptions,
		setup(props) {
			// 是否展示角标
			const isShowBadge = computed(() => {
				if (props.dot) {
					return true;
				}
				const count = Number(props.count);
				if (!props.showZero && !isNaN(count) && count === 0) {
					return false;
				}
				if (props.count == null) return false;
				return true;
			});

			// 徽标外层样式类
			const badgeClasses = computed(() => ({
				[`${name}`]: true,
				[`${name}__ribbon-outer`]: props.shape === 'ribbon',
			}));

			// 徽标内层样式类
			const badgeInnerClasses = computed(() => ({
				[`${name}--basic`]: true,
				[`${name}--dot`]: props.dot,
				[`${name}--${props.size}`]: true,
				[`${name}--${props.shape}`]: true,
				[`${name}--count`]: !props.dot && props.count,
				[`${prefix}-has-count`]: true,
			}));

			const hasUnit = (unit) =>
				unit.indexOf('px') > 0 ||
				unit.indexOf('rpx') > 0 ||
				unit.indexOf('em') > 0 ||
				unit.indexOf('rem') > 0 ||
				unit.indexOf('%') > 0 ||
				unit.indexOf('vh') > 0 ||
				unit.indexOf('vm') > 0;

			// 徽标自定义样式
			const badgeStyles = computed(() => {
				if (!props.offset) {
					return {
						background: props.color
					};
				}
				let [xOffset = 0, yOffset = 0] = props.offset;
				xOffset = hasUnit(xOffset.toString()) ? xOffset : `${xOffset}px`;
				yOffset = hasUnit(yOffset.toString()) ? yOffset : `${yOffset}px`;
				return {
					background: props.color,
					right: xOffset,
					top: yOffset,
				};
			});

			const badgeValue = computed(() => {
				if (props.dot) {
					return '';
				}
				const count = Number(props.count);
				if (isNaN(count) || isNaN(props.maxCount)) {
					return props.count;
				}
				return count > props.maxCount ? `${props.maxCount}+` : count;
			});

			return {
				...toRefs(props),
				classPrefix: name,
				badgeClasses,
				isShowBadge,
				badgeInnerClasses,
				badgeStyles,
				badgeValue,
			}
		}

	})
</script>

<style lang="less" :scoped="false">
	@import "./style/badge.less";
</style>