export { hash, createHash, getBitMask, getHashMask, simpleHash } from './hash.utils.js';

export {
  getNonce,
  escapeSelector,
  fixHTMLTagClassNamesList,
  compareClassNames,
} from './browser.utils.js';

export {
  asRegExp,
  asNumber,
  asString,
  asArray,
  identity,
  removeReadonly,
  keysOf,
} from './identity.utils.js';

export { toColorValue } from './color.utils.js';

export { hasOwnProperty, isObject, isString, noop, uniq } from './function.utils.js';

export {
  toCamelCase,
  toHyphenCase,
  toTailDashed,
  generateAlphabeticName,
  escapeBackticksAndOctals,
  splitBySpace,
  assertString,
} from './string.utils.js';

export {
  createExponentialUnits,
  createLinearUnits,
  createPercentRatios,
} from './create-value.utils.js';

export * as Base64Utils from './base64.js';

export type {
  ArrayType,
  DeepPartial,
  Falsey,
  KebabCase,
  MaybeArray,
  StringLike,
  UnionToIntersection,
  ColorsRecord,
  AnyPrimitive,
  PropsFrom,
  OmitUndefined,
  ClassNameProps,
  StyledComponentProps,
  Prettify,
  NegativeInteger,
  PositiveInteger,
} from './utility.types.js';
