export default {
	/** 透传至 Button 组件 */
	buttonProps: {
		type: Object,
	},
	/** 图标 */
	icon: {
		type: String,
	},
	/** 悬浮按钮的样式，常用于调整位置 */
	style: {
		type: String,
		default: 'right: 16px; bottom: 32px;',
	},
	/** 文本内容 */
	text: {
		type: String,
		default: '',
	},
	/** 悬浮按钮点击事件 */
	onClick: Function,
};