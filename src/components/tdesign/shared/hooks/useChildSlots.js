import {
	getCurrentInstance,
	isVNode
} from 'vue';

/**
 * 获取子组件VNode。处理多种子组件创建场景
 * 使用场景：<t-steps> <t-steps-item /> </t-steps>, <t-steps> <t-steps-item v-for="(item, index)" :key="index" /> </t-steps>
 * @param childInSlots
 * @returns
 */
export function useChildSlots(childComponentName, childInSlots) {
	const recurChildren = (children) => {
		const result = [];
		if (Array.isArray(children)) {
			children.forEach((child) => {
				if (isVNode(child)) {
					result.push(child);

					if (child.component?.subTree) {
						result.push(child.component.subTree);
						result.push(...recurChildren(child.component.subTree.children));
					}

					if (child.children) {
						result.push(...recurChildren(child.children));
					}
				}
			});
		}
		return result;
	};
	const targetChildren = [];
	if (childInSlots !== undefined) {
		targetChildren.push(...recurChildren(childInSlots));
	} else {
		targetChildren.push(...recurChildren(getCurrentInstance()?.subTree.children));
	}
	// @ts-ignore
	return targetChildren.filter((child) => child.type?.name === childComponentName);
}