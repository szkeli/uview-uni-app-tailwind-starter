import {
	isRef,
	ref
} from 'vue';


export function useToggle(values, defaultValue) {
	const innerValues = values || [true, false];
	let state = ref();
	if (defaultValue === undefined) {
		state = ref(innerValues[1]);
	} else if (isRef(defaultValue)) {
		state = defaultValue;
	} else {
		state = ref(defaultValue);
	}
	const toggle = (value) => {
		if (value !== undefined) {
			state.value = value;
		} else {
			state.value = state.value === innerValues[1] ? innerValues[0] : innerValues[1];
		}
	};
	return {
		state,
		toggle,
	};
}