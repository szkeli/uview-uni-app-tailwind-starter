<template>
	<view v-if="innerVisible" :class="[classPrefix, contentClasses]" :style="rootStyles">
		<t-transition :show="innerVisible " :mode="contentTransitionName">
			<view :class="`${classPrefix}__content`">
				<slot name="content" />
				<slot />
				<view :class="`${classPrefix}__close`" @click="handleClose">
					<t-icon name="close" v-if="closeBtn" size="64rpx" />
					<slot name="close-btn" :class="`${classPrefix}-slot`" />
				</view>
			</view>
		</t-transition>
	</view>
	<t-overlay v-bind="overlayProps" :visible="innerVisible" @click="handleOverlayClick"></t-overlay>
</template>

<script>
	import {
		computed,
		defineComponent,
		reactive,
		ref,
		watch
	} from "vue"
	import PropsProps from './props'
	import {
		useEmitEvent,
		useDefault
	} from '../../shared';
	import TOverlay from '../overlay'
	import TIcon from '../icon'
	import TTransition from '../transition'
	import config from '../../common/config';
	const {
		prefix
	} = config;
	const name = `${prefix}-popup`;
	export default defineComponent({
		name,
		props: PropsProps,
		emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
		components: {
			[TOverlay.name]: TOverlay,
			[TIcon.name]: TIcon,
			[TTransition.name]: TTransition
		},
		options: {
			// virtualHost: true
		},
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit)
			const [currentVisible, setVisible] = useDefault(
				props,
				context.emit,
				'visible',
				'visible-change',
			);

			const innerVisible = ref(currentVisible.value);

			watch(currentVisible, (val) => {
				innerVisible.value = val
			})

			const rootStyles = computed(() => {
				const styles = {};

				if (props.zIndex) {
					styles.zIndex = `${props.zIndex}`;
				}
				return {
					...(context.attrs.style),
					...styles
				};
			});

			const contentClasses = computed(() => ({
				[`${name}--${props.placement}`]: true,
			}));

			//动画
			const contentTransitionName = computed(() => {
				const {
					placement
				} = props;
				if (placement === 'center') return ['fade', 'zoom-in'];
				return `slide-${placement}`
			})

			/**
			 * 关闭遮罩层
			 */
			const handleOverlayClick = (e) => {
				if (!props.closeOnOverlayClick) {
					return;
				}
				setVisible(false)
			}

			const handleClose = (e) => {
				emitEvent('close', {
					e
				});
				setVisible(false)
			}

			watch(() => currentVisible.value, (val) => {
				if (val) {
					setVisible(true);
				}
			});

			return {
				classPrefix: name,
				innerVisible,
				handleOverlayClick,
				contentClasses,
				rootStyles,
				contentTransitionName,
				handleClose
			};
		}

	})
</script>

<style lang="less" :scoped="false">
	@import './style/popup.less';
</style>