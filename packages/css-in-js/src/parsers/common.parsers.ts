import * as P from '@react-toolbelt/arc-parser';
import { cssCommentToken } from './parser.tags';

const betweenMultilineComment = P.between(P.literal('/*'))(P.literal('*/'));

export const cssMultilineCommentParser = betweenMultilineComment(
  P.anythingExcept(P.literal('*/')),
).map((comment) => cssCommentToken(comment));

export const cssCommentParser = P.sequenceOf([
  P.literal('//'),
  P.anythingExcept(P.newLine),
  P.newLine,
]).map(([_, comment]) => cssCommentToken(comment));
