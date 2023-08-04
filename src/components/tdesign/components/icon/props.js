const props = {
	/** 图标颜色 */
	color: {
		type: String,
		default: '',
	},
	/** 图标名称 */
	name: {
		type: String,
		default: '',
		required: true,
	},
	/** 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等 */
	size: {
		type: String,
		default: '',
	},
	/** 自定义图标前缀 */
	prefix: {
		type: String,
		default: undefined,
	},
};

export default props;