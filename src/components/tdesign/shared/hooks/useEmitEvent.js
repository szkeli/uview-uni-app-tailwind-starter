import {
	camelCase
} from '../../common/libs/utils'

export function useEmitEvent(props, emit) {
	return function emitEvent(eventName, ...args) {
		let emitEventMethodName = '';
		if (typeof eventName === 'string') {
			emitEventMethodName = camelCase(`on-${eventName}`);
		}

		if (typeof props[emitEventMethodName] === 'function') {
			props[emitEventMethodName](...args);
		} else {
			emit(eventName, ...args);
		}
	}
}