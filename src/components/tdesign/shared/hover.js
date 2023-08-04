const Hover = {
	created(el, binding) {
		const startTime = 50;
		const stayTime = 70;
		const {
			className,
			active = true
		} = binding.value;

		if (!active) return;

		el.addEventListener(
			'touchstart',
			() => {
				setTimeout(() => {
					el?.classList.add(className);
				}, startTime);
			},
			false,
		);

		el.addEventListener(
			'touchend',
			() => {
				setTimeout(() => {
					el?.classList.remove(className);
				}, stayTime);
			},
			false,
		);
	},
};

export default Hover;