export default {
	/** 自定义右侧操作按钮文字，如：“取消” */
	action: {
		type: String,
		default: '',
	},
	/** 【讨论中】联想词列表，如果不存在或长度为 0 则不显示联想框。可以使用函数 `label` 自定义联想词为任意内容；也可使用插槽 `option` 定义联想词内容，插槽参数为 `{ option: AutocompleteOption; index: number }`。如果 `group` 值为 `true` 则表示当前项为分组标题 */
	autocompleteOptions: {
		type: Array,
	},
	/** 是否居中 */
	center: {
		type: Boolean,
		default: false
	},
	/** 是否可清空 */
	clearable: {
		type: Boolean,
		default: true,
	},
	/** 禁用状态 */
	disabled: {
		type: Boolean,
		default: false
	},
	/** 是否聚焦 */
	focus: {
		type: Boolean,
		default: Boolean
	},
	/** 左侧文本 */
	label: {
		type: String,
		default: '',
	},
	/** 左侧图标 */
	leftIcon: {
		type: String,
		default: 'search',
	},
	/** 占位符 */
	placeholder: {
		type: String,
		default: '',
	},
	/** 只读状态 */
	readonly: Boolean,
	/** 搜索框形状 */
	shape: {
		type: String,
		default: 'square',
		validator(val) {
			if (!val) return true;
			return ['square', 'round'].includes(val);
		},
	},
	/** 值，搜索关键词 */
	value: {
		type: String,
		default: undefined,
	},
	modelValue: {
		type: String,
		default: undefined,
	},
	/** 控制拉起的键盘类型 */
	type: {
		type: String,
		default: 'text',
	},
	/** 值，搜索关键词，非受控属性 */
	defaultValue: {
		type: String,
		default: '',
	},
	/** 点击搜索框右侧操作内容时触发 */
	onActionClick: Function,
	/** 失去焦点时触发 */
	onBlur: Function,
	/** 搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词 */
	onChange: Function,
	/** 点击清除时触发 */
	onClear: Function,
	/** 获得焦点时触发 */
	onFocus: Function,
	/** 【讨论中】搜索触发，包含：手机键盘提交健、联想关键词点击、清空按钮点击等 */
	onSearch: Function,
	/** 提交时触发，如：手机键盘提交按钮点击 */
	onSubmit: Function,
};