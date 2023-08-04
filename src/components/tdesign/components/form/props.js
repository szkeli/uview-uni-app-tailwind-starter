export default {
	/** 是否在表单标签字段右侧显示冒号 */
	colon: {
		type: Boolean,
		default: false
	},
	/** 表单数据 */
	model: {
		type: Object,
		default: () => ({}),
	},
	/** 是否禁用整个表单 */
	disabled: {
		type: Boolean,
		default: undefined,
	},
	/** 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }` */
	errorMessage: {
		type: Object,
		default: () => ({}),
	},
	/** 允许表单统一控制禁用状态的自定义组件名称列表。默认会有组件库的全部输入类组件：TInput、TInputNumber、TCascader、TSelect、TOption、TSwitch、TCheckbox、TCheckboxGroup、TRadio、TRadioGroup、TTreeSelect、TDatePicker、TTimePicker、TUpload、TTransfer、TSlider。对于自定义组件，组件内部需要包含可以控制表单禁用状态的变量 `formDisabled`。示例：`['CustomUpload', 'CustomInput']` */
	formControlledComponents: {
		type: Array,
		default: () => ([]),
	},
	/** 表单字段标签对齐方式：左对齐、右对齐、顶部对齐 */
	labelAlign: {
		type: String,
		default: 'right',
		validator(val) {
			if (!val) return true;
			return ['left', 'right', 'top'].includes(val);
		},
	},
	/** 可以整体设置label标签宽度，默认为81px */
	labelWidth: {
		type: [String, Number],
		default: '81px',
	},
	/** 表单字段标签对齐方式：左对齐、右对齐 */
	contentAlign: {
		type: String,
		default: 'left',
		validator(val) {
			if (!val) return true;
			return ['left', 'right'].includes(val);
		},
	},
	/** 表单布局，有两种方式：纵向布局 和 行内布局 */
	layout: {
		type: String,
		default: 'vertical',
		validator(val) {
			if (!val) return true;
			return ['vertical', 'inline'].includes(val);
		},
	},
	/** 是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新 */
	preventSubmitDefault: {
		type: Boolean,
		default: true,
	},
	/** 是否显示必填符号（*），默认显示 */
	requiredMark: {
		type: Boolean,
		default: undefined,
	},
	/** 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值 */
	resetType: {
		type: String,
		default: 'empty',
		validator(val) {
			if (!val) return true;
			return ['empty', 'initial'].includes(val);
		},
	},
	/** 表单字段校验规则 */
	rules: {
		type: Object,
		default: () => ({}),
	},
	/** 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动 */
	scrollToFirstError: {
		type: String,
		default: "",
		validator(val) {
			if (!val) return true;
			return ['', 'smooth', 'auto'].includes(val);
		},
	},
	/** 校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性 */
	showErrorMessage: {
		type: Boolean,
		default: true,
	},
	/** 校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标 */
	statusIcon: {
		type: [Boolean, Function],
		default: undefined,
	},
	/** 【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件 */
	submitWithWarningMessage: Boolean,
	/** 表单重置时触发 */
	onReset: Function,
	/** 表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()` */
	onSubmit: Function,
	/** 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表 */
	onValidate: Function,
}