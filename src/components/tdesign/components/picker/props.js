export default {
	/** 用于控制选择器的弹出与收起 **/
	visible: {
		type: Boolean,
		default: false,
	},
	/** 取消按钮文字 */
	cancelBtn: {
		type: [String, Boolean],
		default: true,
	},
	/** 确定按钮文字 */
	confirmBtn: {
		type: [String, Boolean],
		default: true,
	},
	/** 标题 */
	title: {
		type: String,
		default: ""
	},
	/** 每一列的选项 */
	columns: {
		type: [Array, Function],
		default: () => [],
		// required: true,
	},

	modelValue: {
		type: Array,
		default: undefined,
	}
}