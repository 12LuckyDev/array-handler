import arrayHandler, { ARRAY_OPERATION } from '../src/';

const simpleInput = [1, 2, 3];
const objectInput = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

test('ADD operation', () => {
  const resultArray = arrayHandler(simpleInput, ARRAY_OPERATION.ADD, { newValue: 4 });
  const expectedArray = [1, 2, 3, 4];
  resultArray.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('EDIT_AT operation', () => {
  const resultArray = arrayHandler(simpleInput, ARRAY_OPERATION.EDIT_AT, { newValue: 4, index: 1 });
  const expectedArray = [1, 4, 3];
  resultArray.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('REMOVE_AT operation', () => {
  const resultArray = arrayHandler(simpleInput, ARRAY_OPERATION.REMOVE_AT, { index: 1 });
  const expectedArray = [1, 3];
  resultArray.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('MOVE_UP operation', () => {
  const resultArray = arrayHandler(simpleInput, ARRAY_OPERATION.MOVE_UP, { index: 1 });
  const expectedArray = [1, 3, 2];
  resultArray.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('MOVE_DOWN operation', () => {
  const resultArray = arrayHandler(simpleInput, ARRAY_OPERATION.MOVE_DOWN, { index: 1 });
  const expectedArray = [2, 1, 3];
  resultArray.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('EDIT_PROP_AT operation', () => {
  const resultArray = arrayHandler(objectInput, ARRAY_OPERATION.EDIT_PROP_AT, { index: 1, key: 'id', propValue: 4 });
  const expectedArray = [
    { id: 1, name: 'a' },
    { id: 4, name: 'b' },
    { id: 3, name: 'c' },
  ];
  resultArray.forEach((el, i) => expect(el).toEqual(expect.objectContaining(expectedArray[i])));
});

test('TEST simpleInput no change', () => {
  const expectedArray = [1, 2, 3];
  simpleInput.forEach((el, i) => expect(el).toEqual(expectedArray[i]));
});

test('TEST objectInput no change', () => {
  const expectedArray = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
  ];
  objectInput.forEach((el, i) => expect(el).toEqual(expect.objectContaining(expectedArray[i])));
});
