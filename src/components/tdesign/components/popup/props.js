export default {
	/** 关闭按钮，值类型为 Boolean 时表示是否显示关闭按钮。也可以自定义关闭按钮 */
	closeBtn: {
		type: Boolean,
		default: false,
	},
	/** 点击遮罩层是否关闭 */
	closeOnOverlayClick: {
		type: Boolean,
		default: true,
	},
	/** 是否在关闭浮层时销毁浮层 */
	destroyOnClose: {
		type: Boolean,
		default: false
	},
	/** 遮罩层的属性，透传至 overlay */
	overlayProps: {
		type: Object,
		default: () => ({}),
	},
	/** 浮层出现位置 */
	placement: {
		type: String,
		default: 'top',
		validator(val) {
			if (!val) return true;
			return ['top', 'left', 'right', 'bottom', 'center'].includes(val);
		},
	},
	/** 防止滚动穿透 */
	preventScrollThrough: {
		type: Boolean,
		default: true,
	},
	/** 是否显示遮罩层 */
	showOverlay: {
		type: Boolean,
		default: true,
	},
	/** 弹出层内容区的动画名，等价于transition组件的name属性 */
	transitionName: {
		type: String,
		default: '',
	},
	/** 是否显示浮层 */
	visible: {
		type: Boolean,
		default: undefined,
	},
	modelValue: {
		type: Boolean,
		default: undefined,
	},
	/** 是否显示浮层，非受控属性 */
	defaultVisible: Boolean,
	/** 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 */
	zIndex: {
		type: Number,
	},
	/** 当浮层隐藏或显示时触发 */
	onVisibleChange: Function,
};