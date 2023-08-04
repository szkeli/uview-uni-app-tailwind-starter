<template>
	<button :class="buttonClass" :disabled="disabled" role="button" :aria-disabled="disabled" :form-type="type"
		:open-type="openType" :app-parameter="appParameter" :session-from="sessionFrom" @click="onClick"
		@getphonenumber="getphonenumber" @getuserinfo="getuserinfo" @error="error" @opensetting="opensetting"
		@launchapp="launchapp">
		<t-loading v-if="loading" inherit-color v-bind="loadingProps" loading
			:class="`${classPrefix}__loading ${classPrefix}__loading--wrapper`" />
		<t-icon v-if="icon && !loading" :name="icon" :class="[`${classPrefix}__icon`, `${prefix}-class-icon`]"></t-icon>
		<view :class="`${classPrefix}__content`">
			<slot name="content" />
			<block v-if="content">{{content}}</block>
			<slot />
		</view>
		<slot name="suffix" />
	</button>
</template>
<script>
	import {
		computed,
		defineComponent,
		getCurrentInstance,
		toRefs,
		unref
	} from "vue";
	import config from '../../common/config';
	import ButtonProps from './props'
	import Icon from "../icon"
	import Loading from "../loading"
	import {
		useEmitEvent,
		useFormDisabled
	} from '../../shared';
	const {
		prefix,
		componentOptions
	} = config;
	const name = `${prefix}-button`;
	export default defineComponent({
		name,
		emits: ['click'],
		props: ButtonProps,
		options: componentOptions,
		components: {
			[Icon.name]: Icon,
			[Loading.name]: Loading
		},
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit)
			const disabled = useFormDisabled();
			const internalInstance = getCurrentInstance();

			const buttonClass = computed(() => [
				`${name}`,
				`${name}--size-${props.size}`,
				`${name}--${props.variant}`,
				{
					[`${name}--${props.theme}`]: props.theme,
					[`${name}--${props.shape}`]: props.shape,
					[`${name}--ghost`]: props.ghost,
					[`${name}--block`]: props.block,
					[`${name}--disabled`]: disabled.value,
					[`${name}--loading`]: props.loading,
				},
			]);

			const onClick = (e) => {
				if (!props.loading && !disabled.value) {
					emitEvent('click', e);
				} else {
					e.stopPropagation();
				}
			};

			//下面为对接uniapp官方按钮开放能力事件回调的对接
			const getphonenumber = (e) => {
				emitEvent('getphonenumber', e);
			}

			const error = (e) => {
				emitEvent('error', e);
			}

			const getuserinfo = (e) => {
				emitEvent('getuserinfo', e)
			}

			const opensetting = (e) => {
				emitEvent('opensetting', e)
			}

			const launchapp = (e) => {
				emitEvent('launchapp', e)
			}


			return {
				prefix,
				classPrefix: name,
				...toRefs(props),
				disabled,
				buttonClass,
				onClick,
				getphonenumber,
				getuserinfo,
				error,
				opensetting,
				launchapp
			}
		}

	})
</script>

<style lang="less" :scoped="false">
	@import "./style/button.less";
</style>