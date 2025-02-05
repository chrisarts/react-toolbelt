import type { ParserTokenIdentity } from './parsers.types.js';

export const tokenIdentity: ParserTokenIdentity = (type) => (value) => ({
  type,
  value,
});

export const numericToken = tokenIdentity('INTEGER');
export const floatToken = tokenIdentity('FLOAT');
export const cssUnitToken = tokenIdentity('UNIT');
export const mathOperatorToken = tokenIdentity('MATH_OPERATOR');

export const attributeSelectorToken = tokenIdentity('ATTRIBUTE_SELECTOR');
export const elementSelectorToken = tokenIdentity('ELEMENT_SELECTOR');
export const pseudoClassSelectorToken = tokenIdentity('PSEUDO_CLASS_SELECTOR');
export const pseudoElementSelectorToken = tokenIdentity('PSEUDO_ELEMENT_SELECTOR');

export const cssCommentToken = tokenIdentity('COMMENT');
