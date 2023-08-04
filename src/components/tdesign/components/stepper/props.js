export default {
	/** 禁用输入框 */
	disableInput: {
		type: Boolean,
		default: false
	},
	/** 禁用全部操作 */
	disabled: {
		type: Boolean,
		default: false
	},
	/** 输入框宽度 */
	inputWidth: {
		type: Number,
	},
	/** 最大值 */
	max: {
		type: Number,
		default: 100,
	},
	/** 最小值 */
	min: {
		type: Number,
		default: 0,
	},
	/** 组件尺寸 */
	size: {
		type: String,
		default: 'medium',
		validator(val) {
			if (!val) return true;
			return ['small', 'medium', 'large'].includes(val);
		},
	},
	/** 步长 */
	step: {
		type: Number,
		default: 1,
	},
	/** 组件风格 */
	theme: {
		type: String,
		default: 'normal',
		validator(val) {
			if (!val) return true;
			return ['normal', 'filled', 'outline'].includes(val);
		},
	},
	/** 值 */
	value: {
		type: [String, Number],
		default: undefined,
	},
	modelValue: {
		type: [String, Number],
		default: undefined,
	},
	/** 值，非受控属性 */
	defaultValue: {
		type: [String, Number],
		default: 0,
	},
	/** 输入框失去焦点时触发 */
	onBlur: Function,
	/** 数值发生变更时触发 */
	onChange: Function,
	/** 输入框聚焦时触发 */
	onFocus: Function,
	/** 数值超出限制时触发 */
	onOverlimit: Function,
}