import {
	ref,
	watch,
	onMounted,
	toRefs
} from 'vue';

// #ifdef H5
import {
	useChildSlots
} from '../../../shared'
// #endif



export const getOptionListBySlots = (nodes) => {
	const arr = [];
	nodes?.forEach((node) => {
		const option = node.props;
		if (option?.['check-all'] === '' || option?.['check-all'] === true) {
			option.checkAll = true;
		}
		option && arr.push(option);
	});
	return arr;
};


export const getOptions = (props, slots) => {
	const {
		options
	} = toRefs(props);
	const optionList = ref([]);

	watch(
		options,
		(options) => {
			if (!options) return [];
			optionList.value = options.map((item) => {
				let r = {};
				if (typeof item !== 'object') {
					r = {
						label: String(item),
						value: item
					};
				} else {
					r = {
						...item
					};
					r.disabled = r.disabled === undefined ? props.disabled : r.disabled;
				}
				return r;
			});
		}, {
			immediate: true
		},
	);
	// #ifdef H5
	onMounted(() => {
		const nodes = slots.default && slots.default();
		if (nodes !== undefined) {
			optionList.value = getOptionListBySlots(useChildSlots('t-checkbox'));
		}
	});
	// #endif

	return optionList;
};