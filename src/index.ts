import { add, editAt, editPropAt, removeAt, moveDown, moveUp } from '@12luckydev/utils';

export enum ARRAY_OPERATION {
  ADD = 0,
  EDIT_AT = 1,
  EDIT_PROP_AT = 2,
  REMOVE_AT = 3,
  MOVE_UP = 4,
  MOVE_DOWN = 5,
}

type addArgs<T> = { newValue: T };
type editAtArgs<T> = { newValue: T; index: number };
type onluIndexArgs = { index: number };
type editPropAtArgs<T, K extends keyof T> = { index: number; key: K; propValue: T[K] };
type allArgs<T, K extends keyof T> = addArgs<T> | editAtArgs<T> | onluIndexArgs | editPropAtArgs<T, K>;

/**
 * Performs the given operation on the array
 * @param array Original array
 * @param operation Type of operation
 * @param args Operation arguments
 */
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.ADD, args: addArgs<T>): T[];
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.EDIT_AT, args: editAtArgs<T>): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.EDIT_PROP_AT,
  args: editPropAtArgs<T, K>,
): T[];
function arrayHandler<T>(
  array: T[],
  operation: ARRAY_OPERATION.REMOVE_AT | ARRAY_OPERATION.MOVE_DOWN | ARRAY_OPERATION.MOVE_UP,
  args: onluIndexArgs,
): T[];
function arrayHandler<T, K extends keyof T>(array: T[], operation: ARRAY_OPERATION, args: allArgs<T, K>): T[] {
  switch (operation) {
    case ARRAY_OPERATION.ADD:
      return add(array, (args as addArgs<T>).newValue);
    case ARRAY_OPERATION.EDIT_AT:
      return editAt(array, (args as editAtArgs<T>).newValue, (args as editAtArgs<T>).index);
    case ARRAY_OPERATION.EDIT_PROP_AT:
      return editPropAt(
        array,
        (args as editPropAtArgs<T, keyof T>).key,
        (args as editPropAtArgs<T, keyof T>).propValue,
        (args as editPropAtArgs<T, keyof T>).index,
      );
    case ARRAY_OPERATION.REMOVE_AT:
      return removeAt(array, (args as onluIndexArgs).index);
    case ARRAY_OPERATION.MOVE_DOWN:
      return moveDown(array, (args as onluIndexArgs).index);
    case ARRAY_OPERATION.MOVE_UP:
      return moveUp(array, (args as onluIndexArgs).index);
    default:
      return array;
  }
}

export default arrayHandler;
