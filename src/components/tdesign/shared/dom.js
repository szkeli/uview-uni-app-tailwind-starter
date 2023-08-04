import {
	isFunction,
	isString
} from 'lodash-es';

export function getAttach(node) {
	const attachNode = isFunction(node) ? node() : node;

	if (isString(attachNode)) {
		return document.querySelector(attachNode);
	}
	if (attachNode instanceof HTMLElement) {
		return attachNode;
	}
	return document.body;
}

export function stopPropagation(event) {
	event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
	if (typeof event.cancelable !== 'boolean' || event.cancelable) {
		// The event can be canceled, so we do so.
		event.preventDefault();
	}

	if (isStopPropagation) {
		stopPropagation(event);
	}
}

/**
 * 获取节点信息
 * @param {String} selector 节点 #id,.class
 * @param {Object} all 是否返回所有 selector 对应的节点
 * @param {Object} scope 作用域（支付宝小程序无效）
 */
export function getRect(selector, all, scope) {
	return new Promise((resolve) => {
		let query = null;
		// #ifndef MP-ALIPAY
		query = uni.createSelectorQuery().in(scope)
		// #endif
		// #ifdef MP-ALIPAY
		query = uni.createSelectorQuery()
		// #endif
		query[all ? 'selectAll' : 'select'](selector)
			.boundingClientRect((rect) => {
				if (all && Array.isArray(rect) && rect.length) {
					resolve(rect)
				}
				if (!all && rect) {
					resolve(rect)
				}
			})
			.exec()
	});
}