import {
	ref,
	getCurrentInstance
} from "vue"
export function useVModel(value, modelValue, defaultValue, onChange, propName) {
	const {
		emit
	} = getCurrentInstance();

	const internalValue = ref();
	internalValue.value = defaultValue;

	// 受控模式 v-model:propName
	if (typeof value.value !== 'undefined') {
		return [
			value,
			(newValue, ...args) => {
				emit?.(`update:${propName}`, newValue, ...args);
				onChange?.(newValue, ...args);
			},
		];
	}


	// 受控模式:modelValue v-model
	if (typeof modelValue.value !== 'undefined') {
		return [
			modelValue,
			(newValue, ...args) => {
				emit?.(`update:modelValue`, newValue, ...args);
				onChange?.(newValue, ...args);
			},
		];
	}

	// 非受控模式
	return [
		internalValue,
		(newValue, ...args) => {
			internalValue.value = newValue;
			onChange?.(newValue, ...args);
		},
	];
}

// emits name
export const UPDATE_MODEL = 'update:modelValue';
export const UPDATE_VALUE = 'update:value';