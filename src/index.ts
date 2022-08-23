import { add, editAt, editPropAt, removeAt, moveDown, moveUp } from '@12luckydev/utils';

/**
 * Array operations types
 */
export enum ARRAY_OPERATION {
  ADD = 'ADD',
  EDIT_AT = 'EDIT_AT',
  EDIT_PROP_AT = 'EDIT_PROP_AT',
  REMOVE_AT = 'REMOVE_AT',
  MOVE_UP = 'MOVE_UP',
  MOVE_DOWN = 'MOVE_DOWN',
}

/**
 * Arguments type
 */
type optType<T, K extends keyof T> =
  | { operation: ARRAY_OPERATION.ADD; newValue: T }
  | { operation: ARRAY_OPERATION.EDIT_AT; newValue: T; index: number }
  | { operation: ARRAY_OPERATION.REMOVE_AT | ARRAY_OPERATION.MOVE_DOWN | ARRAY_OPERATION.MOVE_UP; index: number }
  | { operation: ARRAY_OPERATION.EDIT_PROP_AT; index: number; key: K; propValue: T[K] };

/**
 * Array handler type
 */
type changeHandlerType<T, K extends keyof T> = (args: { newArray: T[]; oldArray: T[]; opt: optType<T, K> }) => T[];

function arrayHandler<T, K extends keyof T>(
  array: T[],
  opt: optType<T, K>,
  changeHandler?: changeHandlerType<T, K>,
): T[] {
  let newArray = [];
  switch (opt.operation) {
    case ARRAY_OPERATION.ADD:
      newArray = add(array, opt.newValue);
      break;
    case ARRAY_OPERATION.EDIT_AT:
      newArray = editAt(array, opt.newValue, opt.index);
      break;
    case ARRAY_OPERATION.EDIT_PROP_AT:
      newArray = editPropAt(array, opt.key, opt.propValue, opt.index);
      break;
    case ARRAY_OPERATION.REMOVE_AT:
      newArray = removeAt(array, opt.index);
      break;
    case ARRAY_OPERATION.MOVE_DOWN:
      newArray = moveDown(array, opt.index);
      break;
    case ARRAY_OPERATION.MOVE_UP:
      newArray = moveUp(array, opt.index);
      break;
    default:
      newArray = array;
      break;
  }
  return changeHandler ? changeHandler({ newArray, oldArray: array, opt }) : newArray;
}

export default arrayHandler;
