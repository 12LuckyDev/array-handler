import { arrayHandler, ARRAY_OPERATION } from '../src/';

test('TESTING arrayHandler', () => {
  const input1 = [1, 2, 3];
  expect(arrayHandler(input1, ARRAY_OPERATION.ADD, { newValue: 4 })).toEqual([1, 2, 3, 4]);
  expect(arrayHandler(input1, ARRAY_OPERATION.EDIT_AT, { newValue: 4, index: 1 })).toEqual([1, 4, 3]);
  expect(arrayHandler(input1, ARRAY_OPERATION.REMOVE_AT, { index: 1 })).toEqual([1, 3]);

  const input2 = [{ id: 1 }, { id: 2 }, { id: 3 }];
  expect(arrayHandler(input2, ARRAY_OPERATION.EDIT_PROP_AT, { index: 1, key: 'id', propValue: 4 })).toEqual([
    expect.objectContaining({
      id: 1,
    }),
    expect.objectContaining({
      id: 4,
    }),
    expect.objectContaining({
      id: 3,
    }),
  ]);
});
