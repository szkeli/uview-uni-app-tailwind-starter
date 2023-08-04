<template>
	<t-popup :visible="visible" placement="bottom" @visible-change="onPopupChange">
		<view :class="`${classPrefix}`">
			<view :class="`${classPrefix}__toolbar`">
				<view v-if="cancelButtonText" :class="`${classPrefix}__cancel`" @click="handleCancel">
					{{ cancelButtonText }}
				</view>
				<view :class="`${classPrefix}__title`">{{ title }}</view>
				<view v-if="confirmButtonText" :class="`${classPrefix}__confirm`" @click="handleConfirm">
					{{ confirmButtonText }}
				</view>
			</view>
			<view :class="`${classPrefix}__main`">
				<view :class="`${classPrefix}__mask ${classPrefix}__mask--top`"></view>
				<view :class="`${classPrefix}__mask ${classPrefix}__mask--bottom`"></view>
				<view :class="`${classPrefix}__indicator`"></view>
			</view>
		</view>
	</t-popup>
</template>

<script>
	import {
		computed,
		defineComponent,
		ref
	} from "vue"
	import TPopup from '../popup'
	import PickerProps from './props'
	import {
		useEmitEvent,
		useDefault
	} from '../../shared';
	import config from '../../common/config';
	import {
		isBoolean,
		isString
	} from "lodash-es";
	const {
		prefix
	} = config;
	const componentName = `${prefix}-picker`;
	export default defineComponent({
		name: componentName,
		components: {
			[TPopup.name]: TPopup
		},
		options: {
			virtualHost: true,
			multipleSlots: true,
		},
		props: PickerProps,
		emits: ['change', 'confirm', 'cancel', 'update:visible', 'update:modelValue'],
		setup(props, context) {

			//获取默认文字
			const getDefaultText = (prop, defaultText = '') => {
				if (isString(prop)) return prop;
				if (isBoolean(prop)) return defaultText;
				return ''
			}

			//左侧取消按钮
			const cancelButtonText = computed(() => getDefaultText(props.cancelBtn, '取消'));
			const confirmButtonText = computed(() => getDefaultText(props.confirmBtn, '确认'));

			//取消按钮
			const handleCancel = (e) => {
				// pickerItemInstanceArray.value.forEach((item: any, index: number) => {
				//   item.exposed?.setIndex(curIndexArray[index]);
				// });
				context.emit('update:visible', false)
				// props.onCancel?.({ e });
			};
			const handleConfirm = () => {}
			//Popup 操作
			const onPopupChange = (event) => {
				context.emit('update:visible', event)
			}
			return {
				classPrefix: componentName,
				onPopupChange,
				cancelButtonText,
				confirmButtonText,
				handleCancel,
				handleConfirm
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import './style/picker.less';
</style>