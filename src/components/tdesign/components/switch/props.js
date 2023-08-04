export default {
	/** 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close'] */
	customValue: {
		type: Array,
		default: [true, false],
	},
	/** 是否禁用组件，默认为 false */
	disabled: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		default: ""
	},
	/** 开关的图标；[打开时的图标，关闭时的图标] */
	icon: {
		type: Array,
		default: [],
	},
	/** 开关的标签；[打开时的标签，关闭时的标签] */
	label: {
		type: Array,
		default: [],
	},
	/** 是否处于加载中状态 */
	loading: {
		type: Boolean,
		default: false
	},
	/** 开关尺寸 */
	size: {
		type: String,
		default: 'medium',
		validator(val) {
			if (!val) return true;
			return ['small', 'medium', 'large'].includes(val);
		},
	},
	/** 开关值 */
	value: {
		type: [String, Number, Boolean],
		default: undefined,
	},
	modelValue: {
		type: [String, Number, Boolean],
		default: undefined,
	},
	/** 开关值，非受控属性 */
	defaultValue: {
		type: [String, Number, Boolean],
	},
	/** 数据发生变化时触发 */
	onChange: Function,
};