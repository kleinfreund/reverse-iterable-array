# reverse-iterable-array

The `ReverseIterableArray` object is a reverse-iterable array implementation based on the built-in [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object.

Links:

- [**npmjs.com**/package/reverse-iterable-array](https://www.npmjs.com/package/reverse-iterable-array)
- [**github.com**/kleinfreund/reverse-iterable-array](https://github.com/kleinfreund/reverse-iterable-array)

See also:

- `ReverseIterableMap`: [reverse-iterable-map](https://www.npmjs.com/package/reverse-iterable-map)
- `ReverseIterableSet`: [reverse-iterable-set](https://www.npmjs.com/package/reverse-iterable-set)



## Table of Contents

* [Install](#install)
  * [ES Module](#es-module)
  * [Node.js package](#nodejs-package)
* [Usage](#usage)
* [Tests](#tests)
* [Documentation](#documentation)
  * [Constructor](#constructor)
  * [`entries()`](#entries)
  * [`forEachReverse()`](#foreachreverse)
  * [`keys()`](#keys)
  * [`reverseIterator()`](#reverseiterator)
  * [`values()`](#values)
  * [`[Symbol.iterator]()`](#symboliterator)
  * [`[Symbol.toStringTag]()`](#symboltostringtag)
  * [`iteratorFor()`](#iteratorfor)



## Install

### ES Module

Download only the ES module file:

```shell
curl -O https://raw.githubusercontent.com/kleinfreund/reverse-iterable-array/main/src/reverse-iterable-array.mjs
```

### Node.js package

*(Requires Node version 8.5 or higher for ES module support)*

Installs the node package as a dependency. It doesn’t have any dependencies itself.

```shell
npm install --save reverse-iterable-array
```

Note, that Node.js version 8.5 or higher is required, as it comes with experimental support for ES modules. If you don’t want to use it as an ES module, you will need to transpile the package yourself.

## Usage

```js
import { ReverseIterableArray } from './src/reverse-iterable-array.mjs';

const array = new ReverseIterableArray();
```

For more usage examples, clone the repository and run:

```shell
npm install && npm run examples
```

Then, open `http://127.0.0.1:8080/examples` in your browser.



## Tests

**… with Node’s experimental ES module feature**:

```shell
npm test
```



## Documentation

A `ReverseIterableArray` object iterates its elements in insertion or reverse-insertion order — a [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop returns the array’s elements for each iteration.



### Constructor

#### Syntax

```
new ReverseIterableArray([iterable])
```

**Parameters**:

* `iterable`: An [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

#### Usage

```js
const array = new ReverseIterableArray();
```

##### `Array`

```js
const array = new ReverseIterableArray([1, 2, 3]);
```

##### `NodeList`

```js
const array = new ReverseIterableArray(...document.querySelectorAll('div'));
```



### `entries()`

Returns an iterator containing the `[index, element]` pairs for each element in the `ReverseIterableArray` object in insertion order.

An iterator containing the same pairs in reverse-insertion order can be obtained with `entries().reverseIterator()`.

#### Syntax

```
array.entries();
```

**Return value**:

A new `ReverseIterableArray` iterator object.



### `forEachReverse()`

The `forEachReverse()` method executes a provided function once per each `[index, element]` pair in the `ReverseIterableArray` object, in reverse-insertion order.

#### Syntax

```
array.forEachReverse(callback[, thisArg]);
```

**Parameters**:

* **callback**: Function to execute for each element.
* **thisArg**: Value to use as `this` when executing `callback`.



### `keys()`

Returns an iterator containing the indices for each element in the `ReverseIterableArray` object in insertion order.

An iterator containing the same indices in reverse-insertion order can be obtained with `keys().reverseIterator()`.

#### Syntax

```
array.keys();
```

**Return value**:

A new `ReverseIterableArray` iterator object.



### `reverseIterator()`

In theory, following the semantics of `[Symbol.iterator]()`, this should be `[Symbol.reverseIterator]()`. However, as a developer, I cannot define a well-known symbol myself and make use of it. In the future, the a proposal like [The ReverseIterable Interface, by Lee Byron](https://github.com/leebyron/ecmascript-reverse-iterable) might make it’s way into the specification. For the time being, the `reverseIterator()` function serves the same purpose.

#### Syntax

```
array.reverseIterator();
```

**Return value**:

The array **reverse-iterator** function, which is the `values().reverseIterator()` function by default.



### `values()`

Returns an iterator containing the elements in the `ReverseIterableArray` object in insertion order.

An iterator containing the same elements in reverse-insertion order can be obtained with `values().reverseIterator()`.

#### Syntax

```
array.values();
```

**Return value**:

A new `ReverseIterableArray` iterator object.



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



### `iteratorFor()`

Returns an iterator containing the `[index, element]` pairs for each element in the `ReverseIterableArray` object in insertion order **starting with the pair specified by the `index` parameter**.

This allows starting iteration at a specific element in the array.

An iterator containing the same pairs in reverse-insertion order can be obtained with `iteratorFor(index).reverseIterator()`.

#### Syntax

```
array.iteratorFor(index);
```

**Parameters**:

* **index**: Required. The index of the element to start iterating from.

**Return value**:

A new `ReverseIterableArray` iterator object.
