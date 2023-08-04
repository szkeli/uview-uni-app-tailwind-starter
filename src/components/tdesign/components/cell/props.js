export default {
	/** 内容的对齐方式，默认居中对齐 */
	align: {
		type: String,
		default: 'middle',
		validator(val) {
			if (!val) return true;
			return ['top', 'middle', 'bottom'].includes(val);
		},
	},
	/** 是否显示右侧箭头 */
	arrow: Boolean,
	/** 是否显示下边框 */
	bordered: {
		type: Boolean,
		default: true,
	},
	/** 下方内容描述 */
	description: {
		type: String,
	},
	/** 是否开启点击反馈 */
	hover: Boolean,
	/** 主图 */
	image: {
		type: String,
		default: ""
	},
	/** 左侧图标，出现在单元格标题的左侧 */
	leftIcon: {
		type: String,
		default: ""
	},
	/** 和标题同行的说明文字 */
	note: {
		type: String,
	},
	/** 是否显示表单必填星号 */
	required: Boolean,
	/** 最右侧图标 */
	rightIcon: {
		type: String,
	},
	/** 标题 */
	title: {
		type: String,
	},
	/** 链接跳转类型 */
	jumpType: {
		type: String,
		default: 'navigateTo',
		validator(val) {
			if (!val) return true;
			return ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack', 'preloadPage'].includes(val);
		},
	},
	/** 点击后跳转链接地址。如果值为空，则表示不需要跳转 */
	url: {
		type: String,
		default: ''
	}
};