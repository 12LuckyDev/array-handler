# @12luckydev/array-handler

[![npm (scoped)](https://img.shields.io/npm/v/@12luckydev/array-handler)](https://www.npmjs.com/package/@12luckydev/array-handler)

Wrapped functions for handle operations on array without mutation

Using [@12luckydev/utils](https://www.npmjs.com/package/@12luckydev/utils)

## Install

```sh
# using npm
npm i @12luckydev/@12luckydev/array-handler

# using yarn
yarn add 12luckydev/@12luckydev/array-handler
```

## Usage examples

```sh
import arrayHandler, { ARRAY_OPERATION } from '@12luckydev/array-handler';

const simpleInput = [1, 2, 3];

//ADD
const addResultArray = arrayHandler(simpleInput, ARRAY_OPERATION.ADD, { newValue: 4 });

//result: [1, 2, 3, 4]


//EDIT_AT
const editAtResultArray = arrayHandler(simpleInput, ARRAY_OPERATION.EDIT_AT, { newValue: 4, index: 1 });

//result: [1, 4, 3]


//REMOVE_AT
const removeAtResultArray = arrayHandler(simpleInput, ARRAY_OPERATION.REMOVE_AT, { index: 1 });

//result: [1, 3]


//MOVE_UP
const moveUpResultArray = arrayHandler(simpleInput, ARRAY_OPERATION.MOVE_UP, { index: 1 });

//result: [1, 3, 2]


//MOVE_DOWN
const moveUpResultArray = arrayHandler(simpleInput, ARRAY_OPERATION.MOVE_DOWN, { index: 1 });

//result: [2, 1, 3]


//EDIT_PROP_AT

const objectInput = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const editPropAtResultArray =
    arrayHandler(objectInput, ARRAY_OPERATION.EDIT_PROP_AT, { index: 1, key: 'id', propValue: 4 });

/** result:
 *  [{ id: 1, name: 'a' },
 *   { id: 4, name: 'b' },
 *   { id: 3, name: 'c' }];
 */

```

## License

MIT © [12LuckyDev](https://github.com/12LuckyDev)
