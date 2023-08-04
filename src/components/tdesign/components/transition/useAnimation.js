import {
	nextTick,
	onMounted,
	ref
} from "vue"

export function useAnimation(props, ctx) {

	const animation = ref();

	const animationData = ref({});

	const aniRef = ref(null);

	const timer = ref(null);

	const durationTime = ref(300);

	const runAnimate = (fn) => {
		animationData.value = animation.value.export();
		timer.value = setTimeout(() => {
			typeof fn === 'function' && fn();
		}, durationTime.value)
	}

	const stepAnimate = (config = {}) => {
		animation.value.step(config);
	}

	// 驼峰转中横线
	const toLine = (name) => {
		return name.replace(/([A-Z])/g, '-$1').toLowerCase()
	}

	//内置动画类型与实际动画对应字典
	const animationMode = () => {
		return {
			'fade': 'opacity',
			'slide-top': 'translateY',
			'slide-right': 'translateX',
			'slide-bottom': 'translateY',
			'slide-left': 'translateX',
			'zoom-in': 'scale',
			'zoom-out': 'scale'
		}
	}

	const animationType = (type) => {
		return {
			'fade': type ? 1 : 0,
			'slide-top': `translateY(${type ? '0' : '-100%'})`,
			'slide-right': `translateX(${type ? '0' : '100%'})`,
			'slide-bottom': `translateY(${type ? '0' : '100%'})`,
			'slide-left': `translateX(${type ? '0' : '-100%'})`,
			'zoom-in': `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
			'zoom-out': `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
		}
	}

	//处理动画开始前的默认样式
	const styleInit = (type) => {
		let styles = {
			transform: ''
		}
		let buildStyle = (type, mode) => {
			if (mode === 'fade') {
				styles.opacity = animationType(type)[mode]
			} else {
				styles.transform += animationType(type)[mode] + ' '
			}
		}
		if (typeof props.mode === 'string') {
			buildStyle(type, props.mode)
		} else {
			props.mode.forEach(mode => {
				buildStyle(type, mode)
			})
		}
		return styles
	}

	// 处理内置组合动画
	const tranfromInit = (type) => {
		let buildTranfrom = (type, mode) => {
			let aniNum = null
			if (mode === 'fade') {
				aniNum = type ? 0 : 1
			} else {
				aniNum = type ? '-100%' : '0'
				if (mode === 'zoom-in') {
					aniNum = type ? 0.8 : 1
				}
				if (mode === 'zoom-out') {
					aniNum = type ? 1.2 : 1
				}
				if (mode === 'slide-right') {
					aniNum = type ? '100%' : '0'
				}
				if (mode === 'slide-bottom') {
					aniNum = type ? '100%' : '0'
				}
			}
			animation.value[animationMode()[mode]](aniNum)
		}
		if (typeof props.mode === 'string') {
			buildTranfrom(type, props.mode)
		} else {
			props.mode.forEach(mode => {
				buildTranfrom(type, mode)
			})
		}
	}

	const isShow = ref(false);
	const transform = ref('');

	const opacity = ref(1);

	//开始动画
	const open = (config = {}) => {
		animation.value = uni.createAnimation(config)
		clearTimeout(timer.value);
		transform.value = '';
		isShow.value = true;
		let style = styleInit(false);

		if (typeof opacity !== 'undefined') {
			opacity.value = style.opacity
		}

		transform.value = style.transform;
		//确保动态样式已经生效后，执行动画，如果不加 nextTick ，会导致 wx 动画执行异常
		nextTick(() => {
			//TODO 定时器保证动画完全执行，目前有些问题，后面会取消定时器
			timer.value = setTimeout(() => {
				
				tranfromInit(false);
				stepAnimate();
				runAnimate();
				ctx.emit('change', {
					detail: isShow.value
				})
			}, 20)
		})

	}

	//关闭过渡动画
	const close = (type) => {
		if (!animation.value) return;
		tranfromInit(true);
		stepAnimate();
		runAnimate(() => {
			isShow.value = false;
			animationData.value = null;
			animation.value = null;
			let style = styleInit(false);
			opacity.value = style.opacity || 1;
			transform.value = style.transform;
			ctx.emit('change', {
				detail: isShow.value
			})
		})
	}

	onMounted(() => {
		durationTime.value = props.duration;
	})

	return {
		aniRef,
		animationData,
		transform,
		isShow,
		opacity,
		toLine,
		open,
		close
	}

}