export default {
	/** 遮罩层的背景色	 */
	backgroundColor: {
		type: String,
		default: '',
	},
	/** 遮罩层自定义样式。优先级低于其他属性 */
	customStyle: {
		type: String,
		default: '',
	},
	/** 背景色过渡时间，单位毫秒 */
	duration: {
		type: Number,
		default: 300,
	},
	/** 防止滚动穿透，即不允许点击和滚动 */
	preventScrollThrough: {
		type: Boolean,
		default: true,
	},
	/** 是否展示 */
	visible: Boolean,
	/** 遮罩的层级 */
	zIndex: {
		type: Number,
		default: 1000,
	},
	/** 遮罩层是否可关闭 */
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	}
};