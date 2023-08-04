import {h,setBlockTracking} from 'vue';
import {
	camelCase
} from '../common/libs/utils'

/**
 * 渲染 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于 属性值为 undefined 时会渲染默认节点
 * @param instance 组件示例
 * @param name 插槽和属性名称
 * @param options 缺省插槽内容
 * @example renderTNode(getCurrentInstance(), 'closeBtn')
 * @example renderTNode(getCurrentInstance(), 'closeBtn', <t-icon-close />)。this.closeBtn 为空时，则兜底渲染 <t-icon-close />
 */
export const renderTNode = (instance, name, options) => {
	if (instance === null) {
		return h('', null)
	}
	const params = typeof options === 'object' && 'params' in options ? options.params : null;
	const defaultNode = typeof options === 'object' && 'defaultNode' in options ? options.defaultNode : options;

	let propsNode;
	if (name in instance.props || camelCase(name) in instance.props) {
		propsNode = instance.props[name] || instance.props[camelCase(name)];
	}
	// if (propsNode === false) return;

	// 同名优先处理插槽
	if (instance.slots[name]) {
		return instance.slots[name]?.call(params);
	}

	if (propsNode === true && defaultNode) {
		return instance.slots[name] ? instance.slots[name]?.call(params) : defaultNode;
	}

	if (typeof propsNode === 'function') {
		setBlockTracking(-1);
		const vnode = propsNode(h, params);
		setBlockTracking(1);
		return vnode;
	}

	const isPropsEmpty = [undefined, params, ''].includes(propsNode);
	if (isPropsEmpty && instance.slots[name]) return instance.slots[name]?.call(params);
	return propsNode;
}


/**
 * 用于处理相同名称的 TNode 渲染
 * @param vm 组件实例
 * @param name1 第一个名称，优先级高于 name2
 * @param name2 第二个名称
 * @param defaultNode 默认渲染内容：当 name1 和 name2 都为空时会启动默认内容渲染
 * @example renderContent(this, 'default', 'content')
 * @example renderContent(this, 'default', 'content', '我是默认内容')
 * @example renderContent(this, 'default', 'content', { defaultNode: '我是默认内容', params })
 */
export const renderContent = (
	instance,
	name1,
	name2,
	options,
) => {
	if (instance === null) {
		return h('', null);
	}
	const params = typeof options === 'object' && 'params' in options ? options.params : null;
	const defaultNode = typeof options === 'object' && 'defaultNode' in options ? options.defaultNode : options;
	const toParams = params ? {
		params
	} : undefined;
	const node1 = renderTNode(instance, name1, toParams);
	const node2 = renderTNode(instance, name2, toParams);
	const r = [undefined, null, ''].includes(node1) ? node2 : node1;
	return [undefined, null, ''].includes(r) ? defaultNode : r;
};