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
 * Performs the given operation on the array
 * @param array Original array
 * @param operation Type of operation
 * @param args Operation arguments
 */
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.ADD, args: { newValue: T }): T[];
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.EDIT_AT, args: { newValue: T; index: number }): T[];
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.REMOVE_AT, args: { index: number }): T[];
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.MOVE_DOWN, args: { index: number }): T[];
function arrayHandler<T>(array: T[], operation: ARRAY_OPERATION.MOVE_UP, args: { index: number }): T[];
function arrayHandler<T, K extends keyof T>(
  array: T[],
  operation: ARRAY_OPERATION.EDIT_PROP_AT,
  args: { index: number; key: K; propValue: T[K] },
): T[];
function arrayHandler<T, K extends keyof T>(array: T[], operation: ARRAY_OPERATION, args: allArgs<T, K>): T[] {
  switch (operation) {
    case ARRAY_OPERATION.ADD:
      return add(array, (args as { newValue: T }).newValue);
    case ARRAY_OPERATION.EDIT_AT:
      return editAt(
        array,
        (args as { newValue: T; index: number }).newValue,
        (args as { newValue: T; index: number }).index,
      );
    case ARRAY_OPERATION.EDIT_PROP_AT:
      return editPropAt(
        array,
        (args as { index: number; key: K; propValue: T[K] }).key,
        (args as { index: number; key: K; propValue: T[K] }).propValue,
        (args as { index: number; key: K; propValue: T[K] }).index,
      );
    case ARRAY_OPERATION.REMOVE_AT:
      return removeAt(array, (args as { index: number }).index);
    case ARRAY_OPERATION.MOVE_DOWN:
      return moveDown(array, (args as { index: number }).index);
    case ARRAY_OPERATION.MOVE_UP:
      return moveUp(array, (args as { index: number }).index);
    default:
      return array;
  }
}

export default arrayHandler;
