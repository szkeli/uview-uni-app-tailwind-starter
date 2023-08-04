export default {
	/** 文本内容位置，居左/居中/居右 */
	align: {
		type: String,
		default: 'left',
		validator(val) {
			if (!val) return true;
			return ['left', 'center', 'right'].includes(val);
		},
	},
	/** 标题输入框布局方式 */
	layout: {
		type: String,
		default: 'horizontal',
		validator(val) {
			if (!val) return true;
			return ['vertical', 'horizontal'].includes(val);
		},
	},
	/** 是否开启无边框模式 */
	borderless: {
		type: Boolean,
		default: false,
	},
	/** 是否可清空 */
	clearable: {
		type: Boolean,
		default: false
	},
	/** 是否禁用输入框 */
	disabled: {
		type: Boolean,
		default: false
	},
	/** 指定输入框展示值的格式 */
	format: {
		type: Function,
		default: null
	},
	/** 左侧文本 */
	label: {
		type: String,
		default: ''
	},
	/** 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入 */
	allowInputOverMax: {
		type: Boolean,
		default: false
	},
	/** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 */
	maxcharacter: {
		type: Number,
	},
	/** 用户最多可以输入的文本长度，一个中文等于一个计数长度。值为空，则表示不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 */
	maxlength: {
		type: Number,
		default: -1
	},
	/** 占位符 */
	placeholder: {
		type: String,
		default: '',
	},
	/** 组件前置图标 */
	prefixIcon: {
		type: String,
		default: ''
	},
	/** 只读状态 */
	readonly: {
		type: Boolean,
		default: false,
	},
	/** 输入框尺寸 */
	size: {
		type: String,
		default: 'small',
		validator(val) {
			if (!val) return true;
			return ['small', 'medium'].includes(val);
		},
	},
	/** 输入框状态。默认情况会由组件内部根据实际情况呈现，如果文本过长引起的状态变化 */
	status: {
		type: String,
		default: undefined,
		validator(val) {
			if (!val) return true;
			return ['default', 'success', 'warning', 'error'].includes(val);
		},
	},
	/** 后置图标前的后置内容 */
	suffix: {
		type: String,
		defaule: ''
	},
	/** 组件后置图标 */
	suffixIcon: {
		type: String,
		default: ''
	},
	/** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
	tips: {
		type: String,
		default: ''
	},
	/** 输入框类型 */
	type: {
		type: String,
		default: 'text',
		validator(val) {
			if (!val) return true;
			return ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'].includes(val);
		},
	},
	/** 输入框的值 */
	value: {
		type: [String, Number],
		default: undefined,
	},
	modelValue: {
		type: [String, Number],
		default: undefined,
	},
	/** 输入框的值，非受控属性 */
	defaultValue: {
		type: [String, Number],
		default: '',
	},
	/** HTML 元素原生属性 */
	name: {
		type: String,
		value: '',
	},
};