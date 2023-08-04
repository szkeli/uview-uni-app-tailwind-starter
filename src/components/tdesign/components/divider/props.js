const props = {
	/** 文本位置（仅在水平分割线有效） */
	align: {
		type: String,
		default: 'center',
		validator(val) {
			if (!val) return true;
			return ['left', 'right', 'center'].includes(val);
		},
	},
	/** 子元素 */
	content: {
		type: String,
	},
	/** 分隔线颜色 */
	lineColor: {
		type: String,
		default: '',
	},
	/** 是否虚线（仅在水平分割线有效） */
	dashed: {
		type: Boolean,
		default: false,
	},
	/** 组件类名，分别用于设置 组件外层类名、分隔线类名 等 */
	externalClasses: {
		type: Array,
	},
	/** 分隔线类型有两种：水平和垂直 */
	layout: {
		type: String,
		default: 'horizontal',
		validator(val) {
			if (!val) return true;
			return ['horizontal', 'vertical'].includes(val);
		},
	},
};

export default props;