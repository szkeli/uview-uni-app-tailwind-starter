export default {
	/** 链接内容 */
	content: {
		type: String,
	},
	/** 与 navigator 原生组件属性保持一致，具体使用参考：https://zh.uniapp.dcloud.io/component/navigator.html。 url 无效*/
	navigatorProps: {
		type: Object,
		default: {}
	},
	/** 跳转链接 */
	href: {
		type: String,
		default: '',
	},
	/** 禁用链接 */
	disabled: {
		type: Boolean,
		default: false
	},
	/** 是否开启点击反馈 */
	hover: {
		type: Boolean,
		default: false
	},
	/** 前置图标 */
	prefixIcon: {
		type: null,
	},
	/** 尺寸 */
	size: {
		type: String,
		default: 'medium',
		validator(val) {
			if (!val) return true;
			return ['small', 'medium', 'large'].includes(val);
		},
	},
	/** 后置图标 */
	suffixIcon: {
		type: null,
	},

	/** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
	theme: {
		type: String,
		default: 'default',
		validator(val) {
			if (!val) return true;
			return ['default', 'primary', 'danger', 'warning', 'success'].includes(val);
		},
	},
	/** 普通状态是否显示链接下划线 */
	underline: Boolean,
};