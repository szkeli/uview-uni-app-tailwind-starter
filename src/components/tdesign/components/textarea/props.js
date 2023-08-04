export default {
	/** 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入 */
	allowInputOverMax: {
		type: Boolean,
		default: false
	},
	/** 键盘弹起时，是否自动上推页面 */
	adjustPosition: {
		type: Boolean,
		default: true,
	},
	/** 自动聚焦 */
	focus: {
		type: Boolean,
		default: false,
	},
	/** 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 */
	cursorSpacing: {
		type: Number,
		default: 0,
	},
	/** 自动聚焦，拉起键盘 */
	autofocus: {
		type: Boolean,
		default: false,
	},
	/** 是否自动增高，值为 autosize 时，style.height 不生效 */
	autosize: {
		type: Boolean,
		default: false,
	},
	/** 如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true */
	fixed: {
		type: Boolean,
		default: false,
	},
	/** 是否禁用文本框 */
	disabled: {
		type: Boolean,
		default: false,
	},
	/** 是否显示外边框 */
	bordered: {
		type: Boolean,
		default: false,
	},
	/** 显示文本计数器，如 0/140。当 `maxlength < 0 && maxcharacter < 0` 成立时， indicator无效 */
	indicator: {
		type: Boolean,
		default: false,
	},
	/** 左侧文本 */
	label: {
		type: String,
		default: ""
	},
	/** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 */
	maxcharacter: {
		type: Number,
	},
	/** 用户最多可以输入的字符个数 */
	maxlength: {
		type: Number,
		default: -1,
	},
	/** 名称，HTML 元素原生属性 */
	name: {
		type: String,
		default: '',
	},
	/** 占位符 */
	placeholder: {
		type: String,
		default: "",
	},
	/** 占位符样式 */
	placeholderStyle: {
		type: String,
		default: '',
	},
	placeholderClass: {
		type: String,
		default: '',
	},
	/** 文本框值 */
	value: {
		type: String,
		default: undefined,
	},
	modelValue: {
		type: String,
		default: undefined,
	},
	/** 文本框值，非受控属性 */
	defaultValue: {
		type: String,
		default: undefined,
	},
	/** 指定focus时的光标位置 */
	cursor: {
		type: Number,
		default: -1,
	},
	/** 设置键盘右下角按钮的文字，仅在 type='text'时生效 */
	confirmType: {
		type: String,
		default: 'return',
	},
	/** 点击键盘右下角按钮时是否保持键盘不收起点 */
	confirmHold: {
		type: Boolean,
		default: false,
	},
	/** 是否显示键盘上方带有”完成“按钮那一栏 */
	showConfirmBar: {
		type: Boolean,
		default: true,
	},
	/** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
	selectionStart: {
		type: Number,
		default: -1,
	},
	/** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
	selectionEnd: {
		type: Number,
		default: -1,
	},
	/** 是否去掉 iOS 下的默认内边距 */
	disableDefaultPadding: {
		type: Boolean,
		default: false,
	},
	/** focus时，点击页面的时候不收起键盘 */
	holdKeyboard: {
		type: Boolean,
		default: false,
	},
	/*键盘收起时，是否自动失去焦点*/
	autoBlur: {
		type: Boolean,
		default: false,
	},
	/** 失去焦点时触发 */
	onBlur: Function,
	/** 输入内容变化时触发 */
	onChange: Function,
	/** 获得焦点时触发 */
	onFocus: Function,
};