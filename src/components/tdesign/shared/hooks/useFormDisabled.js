import {
	inject,
	computed,
	getCurrentInstance
} from 'vue';

/**
 * 用于实现 form 的全局禁用状态hook
 * @returns
 */
export function useFormDisabled(extend) {
	const ctx = getCurrentInstance();
	const propsDisabled = computed(() => ctx?.props.disabled);
	const {
		disabled
	} = inject('formDisabled', Object.create(null));
	return computed(() => propsDisabled.value || disabled?.value || extend?.value || false);
}