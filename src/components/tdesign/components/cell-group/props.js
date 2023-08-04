export default {
	/** 是否显示组边框 */
	bordered: Boolean,
	/** 单元格组风格 */
	theme: {
		type: String,
		default: 'default',
		validator(val) {
			if (!val) return true;
			return ['default', 'card'].includes(val);
		},
	},
	/** 单元格组标题 */
	title: {
		type: String,
		default: '',
	},
};