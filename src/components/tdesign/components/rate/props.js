export default {
	/** 是否允许半选 */
	allowHalf: {
		type: Boolean,
		default: false
	},
	/** 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：['#ED7B2F', '#E3E6EB']。 */
	color: {
		type: [String, Array],
		default: '#ED7B2F',
	},
	/** 评分的数量 */
	count: {
		type: Number,
		default: 5,
	},
	/** 是否禁用评分 */
	disabled: Boolean,
	/** 评分图标的间距 */
	gap: {
		type: Number,
		default: 8,
	},
	/** 自定义评分图标，[选中图标，未选中图标] */
	icon: {
		type: [String, Array],
		default: undefined,
	},
	/** 是否显示对应的辅助文字 */
	showText: {
		type: Boolean,
		default: false
	},
	/** 评分图标的大小 */
	size: {
		type: String,
		default: '24px',
	},
	/** 评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分'] */
	texts: {
		type: Array,
		default: () => [],
	},
	/** 选择评分的值 */
	value: {
		type: Number,
		default: undefined,
	},
	modelValue: {
		type: Number,
		default: undefined,
	},
	/** 选择评分的值，非受控属性 */
	defaultValue: {
		type: Number,
		default: 0,
	},
	/** 评分数改变时触发 */
	onChange: Function,
};