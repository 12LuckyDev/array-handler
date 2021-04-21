import { add, editAt, editPropAt, removeAt, moveDown, moveUp } from '@12luckydev/utils';

/**
 * Array operations types
 */
export enum ARRAY_OPERATION {
  ADD = 0,
  EDIT_AT = 1,
  EDIT_PROP_AT = 2,
  REMOVE_AT = 3,
  MOVE_UP = 4,
  MOVE_DOWN = 5,
}

/**
 * All args types
 */
type allArgs<T, K extends keyof T> =
  | { newValue: T }
  | { newValue: T; index: number }
  | { index: number }
  | { index: number; key: K; propValue: T[K] };

/**
 * Array handler type
 */
type changeHandlerType<T, K extends keyof T> = (args: {
  operation: ARRAY_OPERATION;
  newArray: T[];
  oldArray: T[];
  newValue?: T;
  index?: number;
  key?: K;
  propValue?: T[K];
}) => T[];

/**
 * Performs the given operation on the array
 * @param array Original array
 * @param operation Type of operation
 * @param args Operation arguments
 */
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.ADD,
  args: { newValue: T },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.EDIT_AT,
  args: { newValue: T; index: number },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.REMOVE_AT,
  args: { index: number },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.MOVE_DOWN,
  args: { index: number },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.MOVE_UP,
  args: { index: number },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.EDIT_PROP_AT,
  args: { index: number; key: K; propValue: T[K] },
  changeHandler?: changeHandlerType<T, K>,
): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION,
  args: allArgs<T, K>,
  changeHandler?: changeHandlerType<T, K>,
): T[] {
  let newArray = [];
  switch (operation) {
    case ARRAY_OPERATION.ADD:
      newArray = add(array, (args as { newValue: T }).newValue);
      break;
    case ARRAY_OPERATION.EDIT_AT:
      newArray = editAt(
        array,
        (args as { newValue: T; index: number }).newValue,
        (args as { newValue: T; index: number }).index,
      );
      break;
    case ARRAY_OPERATION.EDIT_PROP_AT:
      newArray = editPropAt(
        array,
        (args as { index: number; key: K; propValue: T[K] }).key,
        (args as { index: number; key: K; propValue: T[K] }).propValue,
        (args as { index: number; key: K; propValue: T[K] }).index,
      );
      break;
    case ARRAY_OPERATION.REMOVE_AT:
      newArray = removeAt(array, (args as { index: number }).index);
      break;
    case ARRAY_OPERATION.MOVE_DOWN:
      newArray = moveDown(array, (args as { index: number }).index);
      break;
    case ARRAY_OPERATION.MOVE_UP:
      newArray = moveUp(array, (args as { index: number }).index);
      break;
    default:
      newArray = array;
      break;
  }
  return changeHandler ? changeHandler({ operation, newArray, oldArray: array, ...args }) : newArray;
}

export default arrayHandler;
