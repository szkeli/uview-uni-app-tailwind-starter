const props = {
	/** 加载失败时显示的内容。值为 `default` 则表示使用默认加载失败风格；值为空或者 `slot` 表示使用插槽渲染，插槽名称为 `error`；值为其他则表示普通文本内容，如“加载失败” */
	error: {
		type: String,
		default: 'default',
	},
	/** 是否开启图片懒加载 */
	lazy: {
		type: Boolean,
		default: false,
	},
	/** 加载态内容。值为 `default` 则表示使用默认加载中风格；值为空或者 `slot` 表示使用插槽渲染，插槽名称为 `loading`；值为其他则表示普通文本内容，如“加载中” */
	loading: {
		type: String,
		default: 'default',
	},
	/** 图片裁剪、缩放的模式；[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) */
	mode: {
		type: String,
		default: 'scaleToFill',
	},
	/** 图片圆角类型 */
	shape: {
		type: String,
		default: 'square',
	},
	/** 图片链接 */
	src: {
		type: String,
		default: '',
	},
	/** 默认不解析 webP 格式，只支持网络资源 */
	webp: {
		type: Boolean,
		default: false,
	},
	/** 宽度，默认单位为`px` */
	width: {
		type: null,
	},
	/** 高度，默认单位为`px` */
	height: {
		type: null,
	},
	/** 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单。 */
	showMenuByLongpress: {
		type: Boolean,
		default: false,
	},
}
export default props;