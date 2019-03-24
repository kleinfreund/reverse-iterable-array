# reverse-iterable-array

The `ReverseIterableArray` object is a reverse-iterable array implementation based on the built-in [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object.

Links:

- [**npmjs.com**/package/reverse-iterable-array](https://www.npmjs.com/package/reverse-iterable-array)
- [**github.com**/kleinfreund/reverse-iterable-array](https://github.com/kleinfreund/reverse-iterable-array)

See also:

- `ReverseIterableMap`: [reverse-iterable-map](https://www.npmjs.com/package/reverse-iterable-map)
- `ReverseIterableSet`: [reverse-iterable-set](https://www.npmjs.com/package/reverse-iterable-set)



## Table of Contents

- [Installation & usage](#installation--usage)
- [Examples](#examples)
- [Tests](#tests)
- [Documentation](#documentation)
  - [Constructor](#constructor)
  - [`[Symbol.toStringTag]`](#symboltostringtag)
  - [`entries()`](#entries)
  - [`forEachReverse()`](#foreachreverse)
  - [`iteratorFor()`](#iteratorfor)
  - [`keys()`](#keys)
  - [`reverseIterator()`](#reverseiterator)
  - [`values()`](#values)
  - [`[Symbol.iterator]()`](#symboliterator)



## Installation & usage

### Browser

Download the ES module file …

```sh
curl -O https://raw.githubusercontent.com/kleinfreund/reverse-iterable-array/main/dist/esm/reverse-iterable-array.mjs
```

… and import it like this:

```js
import ReverseIterableArray from 'reverse-iterable-array.mjs';

const array = new ReverseIterableArray();
```

### Node

Install the node package as a dependency …

```sh
npm install --save reverse-iterable-array
```

… and import it like this:

- CommonJS module

  ```node
  const ReverseIterableArray = require('reverse-iterable-array').default;

  const array = new ReverseIterableArray();
  ```

- ES module

  ```js
  import ReverseIterableArray from 'reverse-iterable-array/dist/esm/reverse-iterable-array';

  const array = new ReverseIterableArray();
  ```

- TypeScript module

  ```ts
  import ReverseIterableArray from 'reverse-iterable-array/src/reverse-iterable-array';

  const array = new ReverseIterableArray();
  ```



## Examples

For some live usage examples, clone the repository and run the following:

```sh
npm install && npm run examples
```

Then, open [localhost:8080/examples](http://127.0.0.1:8080/examples) in a browser.



## Tests

In order to run the tests, clone the repository and run the following:

```sh
npm install && npm test
```



## Documentation

A `ReverseIterableArray` object iterates its elements in insertion or reverse-insertion order — a [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop returns the array’s elements for each iteration.



### Constructor

#### Syntax

```
new ReverseIterableArray([iterable])
```

**Parameters**:

- `iterable`: An [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

#### Usage

- Without arguments

  ```js
  const array = new ReverseIterableArray();
  //> Array []
  ```

- With multiple elements

  ```js
  const array = new ReverseIterableArray(1, 2, 3);
  //> Array(3) [ 1, 2, 3 ]
  ```

- With a single length argument

  ```js
  const array = new ReverseIterableArray(7);
  //> Array(7) [ <7 empty slots> ]
  ```



### `[Symbol.toStringTag]`

The `ReverseIterableArray[@@toStringTag]` property has an initial value of “ReverseIterableArray”.



### `entries()`

Returns an iterator containing the `[index, element]` pairs for each element in the `ReverseIterableArray` object in insertion order.

An iterator containing the same pairs in reverse-insertion order can be obtained with `entries().reverseIterator()`.

#### Syntax

```
array.entries();
```

**Return value**:

A new `ReverseIterableArray` iterator object.

#### Usage

```js
const array = new ReverseIterableArray(1, 2, 4);

const iterator = array.entries();

iterator.next().value;
//> [0, 1]

iterator.next().value;
//> [1, 2]

iterator.next().value;
//> [2, 4]

iterator.next().value;
//> undefined
```



### `forEachReverse()`

The `forEachReverse()` method executes a provided function once per each `[index, element]` pair in the `ReverseIterableArray` object, in reverse-insertion order.

#### Syntax

```
array.forEachReverse(callback[, thisArg]);
```

**Parameters**:

- **callback**: Function to execute for each element.
- **thisArg**: Value to use as `this` when executing `callback`.

#### Usage

```js
const array = new ReverseIterableArray('a', 'b', 'c');

array.forEachReverse(value => {
  console.log(value);
});
//> c
//> b
//> a

array.forEachReverse(function (value, key, arrayReference) {
  console.log(key, value, arrayReference.size);
});
//> 2 c 3
//> 1 b 3
//> 0 a 3
```



### `iteratorFor()`

Returns an iterator containing the `[index, element]` pairs for each element in the `ReverseIterableArray` object in insertion order **starting with the pair specified by the `index` parameter**.

This allows starting iteration at a specific element in the array.

An iterator containing the same pairs in reverse-insertion order can be obtained with `iteratorFor(index).reverseIterator()`.

#### Syntax

```
array.iteratorFor(index);
```

**Parameters**:

- **index**: Required. The index of the element to start iterating from.

**Return value**:

A new `ReverseIterableArray` iterator object.

#### Usage

```js
const array = new ReverseIterableArray('a', 'b', 'c');

// Iterator, starting at the element with key 1.
const iterator = array.iteratorFor(1);

iterator.next().value;
//> [1, 'b']

iterator.next().value;
//> [2, 'c']

iterator.next().value;
//> undefined

// Reverse-iterator, starting at the element with key 1.
const reverseIterator = array.iteratorFor(1).reverseIterator();

reverseIterator.next().value;
//> [1, 'c']

reverseIterator.next().value;
//> [0, 'a']

reverseIterator.next().value;
//> undefined
```



### `keys()`

Returns an iterator containing the indices for each element in the `ReverseIterableArray` object in insertion order.

An iterator containing the same indices in reverse-insertion order can be obtained with `keys().reverseIterator()`.

#### Syntax

```
array.keys();
```

**Return value**:

A new `ReverseIterableArray` iterator object.

#### Usage

```js
const array = new ReverseIterableArray(1, 2, 4);

const iterator = array.keys();

iterator.next().value;
//> 0

iterator.next().value;
//> 1

iterator.next().value;
//> 2

iterator.next().value;
//> undefined
```



### `reverseIterator()`

In theory, following the semantics of `[Symbol.iterator]()`, this should be `[Symbol.reverseIterator]()`. However, as a developer, I cannot define a well-known symbol myself and make use of it. In the future, the a proposal like [The ReverseIterable Interface, by Lee Byron](https://github.com/leebyron/ecmascript-reverse-iterable) might make it’s way into the specification. For the time being, the `reverseIterator()` function serves the same purpose.

#### Syntax

```
array.reverseIterator();
```

**Return value**:

The array **reverse-iterator** function, which is the `values().reverseIterator()` function by default.

#### Usage

```js
const array = new ReverseIterableArray(1, 2, 4);

const iterator = array.reverseIterator();

iterator.next().value;
//> [2, 4]

iterator.next().value;
//> [1, 2]

iterator.next().value;
//> [0, 1]

iterator.next().value;
//> undefined
```



### `values()`

Returns an iterator containing the elements in the `ReverseIterableArray` object in insertion order.

An iterator containing the same elements in reverse-insertion order can be obtained with `values().reverseIterator()`.

#### Syntax

```
array.values();
```

**Return value**:

A new `ReverseIterableArray` iterator object.

#### Usage

```js
const array = new ReverseIterableArray(1, 2, 4);

const iterator = array.values();

iterator.next().value;
//> 1

iterator.next().value;
//> 2

iterator.next().value;
//> 4

iterator.next().value;
//> undefined
```



### `[Symbol.iterator]()`

Returns the array iterator function. By default, this is the `values()` function.

#### Syntax

```
array[Symbol.iterator]();
```

**Return value**:

The array **iterator** function, which is the `entries()` function by default.

#### Usage

```js
const array = new ReverseIterableArray(1, 2, 4);

const iterator = array[Symbol.iterator]();

iterator.next().value;
//> 1

iterator.next().value;
//> 2

iterator.next().value;
//> 4

iterator.next().value;
//> undefined
```



### `[Symbol.toStringTag]()`

The well-known symbol `Symbol.toStringTag` is accessed internally when callig `Object.prototype.toString()`.

#### Usage

```js
const array = new ReverseIterableArray();

Object.prototype.toString.call(array)
//> [object ReverseIterableArray]
```
