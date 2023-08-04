export default {
	/** 头像替换文本，仅当图片加载失败时有效 */
	alt: {
		type: String,
		default: '',
	},
	/** 组件类名，用于设置组件外层元素类名 */
	externalClasses: {
		type: String,
	},
	/** 头像右上角提示信息，继承 Badge 组件的全部特性。如：小红点，或者数字 */
	badgeProps: {
		type: Object,
	},
	/** 加载失败时隐藏图片 */
	hideOnLoadFailed: Boolean,
	/** 图标 */
	icon: {
		type: [String],
		default: ""
	},
	/** 图片地址 */
	image: {
		type: String,
		default: '',
	},
	/** 透传至 Image 组件 */
	imageProps: {
		type: Object,
	},
	/** 形状 */
	shape: {
		type: String,
		default: 'circle',
		validator(val) {
			if (!val) return true;
			return ['circle', 'round'].includes(val);
		},
	},
	/** 尺寸，示例值：small/medium/large/24px/38px 等。优先级高于 AvatarGroup.size 。Avatar 单独存在时，默认值为 medium。如果父组件存在 AvatarGroup，默认值便由 AvatarGroup.size 决定 */
	size: {
		type: String,
		default: 'medium',
	},
	/** 图片加载失败时触发 */
	onError: Function,
};