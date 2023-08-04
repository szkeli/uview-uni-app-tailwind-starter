// export * from './render';
// export {
// 	default as TNode
// } from './render-tnode';

/**
 * vue3 use
 */
export * from './hooks/useEmitEvent';
export * from './hooks/useFormDisabled';
export * from './hooks/useAttrs';
export * from './hooks/useDefault';
export * from './hooks/useVModel';
export * from './hooks/useToggle';
// #ifdef H5
export * from './hooks/useChildSlots';
// #endif


export * from './util';
export * from './functions';

export * from './component'

/* directives */
export {
	default as Hover
}
from './hover';