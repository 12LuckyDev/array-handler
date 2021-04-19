import { add, editAt, editPropAt, removeAt } from '@12luckydev/utils';

export enum ARRAY_OPERATION {
  ADD,
  EDIT_AT,
  EDIT_PROP_AT,
  REMOVE_AT,
}

type addArgs<T> = { newValue: T };
type editAtArgs<T> = { newValue: T; index: number };
type removeAtArgs = { index: number };
type editPropAtArgs<T, K extends keyof T> = { index: number; key: K; propValue: T[K] };

type allArgs<T, K extends keyof T> = addArgs<T> | editAtArgs<T> | removeAtArgs | editPropAtArgs<T, K>;

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
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.REMOVE_AT, args: removeAtArgs): T[];
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
      return removeAt(array, (args as removeAtArgs).index);
    default:
      return array;
  }
}

export { arrayHandler };
