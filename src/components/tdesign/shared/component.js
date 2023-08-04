import {
	getCurrentInstance
} from 'vue';
export function extendAPI(apis) {
	const instance = getCurrentInstance();
	if (instance && instance.proxy) {
		Object.assign(instance.proxy, apis);
	}
}