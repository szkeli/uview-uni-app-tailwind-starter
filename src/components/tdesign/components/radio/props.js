export default {
	/** 是否允许取消选中 */
	allowUncheck: {
		type: Boolean,
		default: false
	},
	/** 是否为块级元素	 */
	block: {
		type: Boolean,
		default: true,
	},
	/** 是否开启无边框模式 */
	borderless: {
		type: Boolean,
		default: undefined,
	},
	/** 是否选中 */
	checked: {
		type: Boolean,
		default: undefined,
	},
	modelValue: {
		type: Boolean,
		default: undefined,
	},
	/** 是否选中，非受控属性 */
	defaultChecked: {
		type: Boolean,
		default: false
	},
	/** 单选内容 */
	content: {
		type: String,
	},
	/** 是否禁用组件内容（content）触发选中 */
	contentDisabled: {
		type: Boolean,
		default: false
	},
	/** 单选按钮内容，同 label */
	default: {
		type: String,
	},
	/** 是否为禁用态。如果存在父组件 RadioGroup，默认值由 RadioGroup.disabled 控制。Radio.disabled 优先级高于 RadioGroup.disabled */
	disabled: {
		type: Boolean,
		default: undefined,
	},
	/** 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标 */
	icon: {
		type: [String, Array],
		default: 'circle',
	},
	/** 主文案 */
	label: {
		type: String,
	},
	/** 内容最大行数限制 */
	maxContentRow: {
		type: Number,
		default: 5,
	},
	/** 主文案最大行数限制 */
	maxLabelRow: {
		type: Number,
		default: 3,
	},
	/** HTML 元素原生属性 */
	name: {
		type: String,
		default: '',
	},
	/** 复选框和内容相对位置 */
	placement: {
		type: String,
		default: undefined,
		validator(val) {
			if (!val) return true;
			return ['left', 'right'].includes(val);
		},
	},
	/** 单选按钮的值 */
	value: {
		type: [String, Number, Boolean],
		default: undefined,
	},
	/** 选中状态变化时触发 */
	onChange: Function,
};