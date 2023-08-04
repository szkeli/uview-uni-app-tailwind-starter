<template>
	<view :class="`${classPrefix}`">
		<view :class="boxClasses">
			<t-icon v-if="leftIcon" :name="leftIcon" size="24" :class="`${prefix}-icon`" />
			<slot name="leftIcon"></slot>
			<input :type="type" ref="searchInput" :name="name" :disabled="disabled"
				:class="[`${prefix}-input__keyword`, { [`${classPrefix}--center`]: center }]" :focus="focused"
				:value="searchValue" :confirm-type="search" :placeholder="placeholder"
				:placeholder-class="`${classPrefix}__placeholder ${classPrefix}__placeholder--${center ? 'center': 'normal'}`"
				@input="handleInput" @focus="handleFocus" @blur="handleBlur" @confirm="handleSearch" />
			<view v-if="searchValue !=='' && clearable" :class="`${classPrefix}__clear`" @tap="handleClear">
				<t-icon name="close-circle-filled" size="24" />
			</view>
		</view>
		<view v-if="action" :class="`${classPrefix}__search-action`" @tap="onActionClick">
			{{action}}
		</view>
		<slot name="action" />
	</view>
</template>

<script>
	import {
		computed,
		defineComponent,
		toRefs,
		nextTick,
		ref
	} from "vue"
	import Icon from "../icon"
	import SearchProps from './props';
	import {
		useEmitEvent,
		useDefault,
		useFormDisabled
	} from '../../shared';
	import config from '../../common/config';
	const {
		prefix,
		componentOptions
	} = config;
	const componentName = `${prefix}-search`;
	export default defineComponent({
		name: componentName,
		props: SearchProps,
		options: componentOptions,
		components: {
			[Icon.name]: Icon,
		},
		emits: ['update:value', 'update:modelValue', 'action-click', 'focus', 'blur', 'change', 'clear', 'submit'],
		setup(props, context) {
			const emitEvent = useEmitEvent(props, context.emit);
			const searchInput = ref();
			const [searchValue] = useDefault(props, context.emit, 'value', 'change');

			const focused = ref(false)

			const boxClasses = computed(() => [
				`${componentName}__input-box`,
				`${componentName}__input-box--${props.shape}`,
				{
					[`${prefix}-is-focused`]: focused.value,
				},
			]);


			const setInputValue = (v) => {
				const input = searchInput.value;
				const sV = String(v);
				if (!input) {
					return;
				}
				if (input.value !== sV) {
					input.value = sV;
				}
			};

			const inputValueChangeHandle = (e) => {
				const {
					value
				} = e.detail;
				searchValue.value = value;
				nextTick(() => setInputValue(searchValue.value));
			};

			const handleFocus = (e) => {
				focused.value = true;
				emitEvent('focus', {
					value: searchValue.value,
					e
				});
			}

			const handleBlur = (e) => {
				focused.value = false;
				emitEvent('blur', {
					value: searchValue.value,
					e
				});
			}

			const onActionClick = (e) => {
				emitEvent('action-click', {
					e
				});
			};

			const handleSearch = (e) => {
				// 如果按的是 enter 键, 13是 enter
				if (e.keyCode === 13) {
					e.preventDefault(); // 禁止默认（换行）事件
					emitEvent('submit', {
						value: searchValue.value,
						e
					});
				}
			};


			const handleClear = (e) => {
				searchValue.value = '';
				focused.value = true;
				emitEvent('clear', {
					e
				});
			};

			const handleInput = (e) => {
				// 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
				// const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
				// if (e.isComposing || checkInputType) return;
				inputValueChangeHandle(e)
			};


			return {
				prefix,
				classPrefix: componentName,
				...toRefs(props),
				focused,
				searchInput,
				searchValue,
				boxClasses,
				handleInput,
				handleFocus,
				handleBlur,
				onActionClick,
				handleSearch,
				handleClear
			}
		}
	})
</script>

<style lang="less" :scoped="false">
	@import "./style/search.less";
</style>