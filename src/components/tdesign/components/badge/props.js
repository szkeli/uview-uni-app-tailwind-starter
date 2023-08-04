const props = {
	/** 颜色 */
	color: {
		type: String,
		default: '',
	},
	/** 徽标内容，示例：`content='自定义内容'`。也可以使用默认插槽定义 */
	content: {
		type: String,
		default: '',
	},
	/** 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+。特殊：值为空表示使用插槽渲染 */
	count: {
		type: null,
		default: 0,
	},
	/** 是否为红点 */
	dot: {
		type: Boolean,
		default: false,
	},
	/** 组件类名，分别用于设置外层元素、默认内容、右上角内容等元素类名 */
	externalClasses: {
		type: Array,
	},
	/** 封顶的数字值 */
	maxCount: {
		type: Number,
		default: 99,
	},
	/** 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem'] */
	offset: {
		type: Array,
	},
	/** 形状 */
	shape: {
		type: String,
		default: 'circle',
	},
	/** 当数值为 0 时，是否展示徽标 */
	showZero: {
		type: Boolean,
		default: false,
	},
	/** 尺寸 */
	size: {
		type: String,
		default: 'medium',
	},
};

export default props;