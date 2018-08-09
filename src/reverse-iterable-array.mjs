/**
 * A reverse-iterable array implementation based on the built-in [`Array`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. As per `Array`, the order of a `ReverseIterableArray` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export class ReverseIterableArray extends Array {
  /**
   * An [iterable][1] object that accepts any value as elements and has non-negative integers as
   * indices.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
   *
   * @param {Array} arrayLengthOrElements
   * @public
   */
  constructor(...arrayLengthOrElements) {
    super(...arrayLengthOrElements);
  }

  /**
   * The `entries()` method returns a new [Iterator][1] object that contains the `[index, element]`
   * pairs for each element in a `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns {IterableIterator}
   * @public
   */
  entries() {
    const getIteratorValue = index => [index, this[index]];

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * The `forEachReverse()` method executes a provided function once per each index/element pair in
   * the `ReverseIterableArray` object, in reverse insertion order.
   *
   * @param {Function} callback
   * @param {*?} thisArg
   * @public
   */
  forEachReverse(callback, thisArg) {
    for (const [index, currentValue] of this.entries().reverse()) {
      callback(currentValue, index, thisArg ? thisArg : this);
    }
  }

  /**
   * The `keys()` method returns a new [Iterator][1] object that contains the index for each
   * element in a `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns {IterableIterator}
   * @public
   */
  keys() {
    const getIteratorValue = index => index;

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * Allows usage of the [iteration protocols][1] for reverse iteration.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * Examples:
   *
   * ```js
   * const array = new ReverseIterableArray();
   *
   * [...array.reverse()];
   *
   * for (const value of array.reverse()) {
   *   console.log(value);
   * }
   * ```
   *
   * @returns {IterableIterator}
   * @public
   */
  reverseIterator() {
    return this.values().reverse();
  }

  /**
   * The `values()` method returns a new [iterator][1] object that contains the elements in a
   * `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @returns {IterableIterator}
   * @public
   */
  values() {
    const getIteratorValue = index => this[index];

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * The initial value of the [@@iterator][1] property is the same function object as the initial
   * value of the entries property.
   *
   * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
   *
   * @returns {IterableIterator}
   * @public
   */
  [Symbol.iterator]() {
    return this.values();
  }

  /**
   * The [`@@toStringTag`][1] property is accessed internally `Object.prototype.toString()`.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
   *
   * @returns {String} The string tag of the `ReverseIterableArray` class.
   * @public
   */
  get [Symbol.toStringTag]() {
    return 'ReverseIterableArray';
  }

  /**
   * The `iteratorFor()` method returns a new [iterator][1] object that contains the
   * `[index, element]` pairs for each element in a `ReverseIterableArray` object in insertion order
   *  **starting with the pair specified by the `index` parameter**.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @param {Number} index The index of the element to start iterating from.
   * @returns {IterableIterator}
   * @public
   */
  iteratorFor(index) {
    const getIteratorValue = index => [index, this[index]];

    return this.iterableIterator(getIteratorValue, index);
  }

  /**
   * Returns an object which is both an iterable and an iterator. It fulfills the requirements of
   * the [iteration protocols][1] plus allowing reverse-iteration.
   *
   * - **Iterator requirements**: An object that implements a function `next`. This function
   *   returns an object with two properties: `value` and `done`.
   *
   * - **Iterable requirements**: An object that implements a function `[Symbol.iterator]()`. This
   *   function returns an iterator.
   *
   * - **Reverse-iterable requirements**: An object that implements a function `reverse`. This
   *   function returns an iterator with the special behavior of iterating in reverse insertion
   *   order. This is non-standard behavior.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * @param {Function} getIteratorValue
   * @param {Number?} startIndex Index of the element to start iterating from
   * @returns {IterableIterator} a reverse-iterable iterator
   * @private
   */
  iterableIterator(getIteratorValue, startIndex = undefined) {
    let currentIndex = startIndex !== undefined ? startIndex : 0;
    // Store the last array index because inside the reverse() method, `this` will be
    // bound to the `iterableIterator` method, not the `ReverseIterableArray` object.
    const lastIndex = this.length - 1;
    let nextStep = 1;

    return {
      reverse() {
        currentIndex = startIndex !== undefined ? startIndex : lastIndex;
        nextStep = -1;
        return this;
      },
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next() {
        let value;
        if (0 <= currentIndex && currentIndex <= lastIndex) {
          value = getIteratorValue(currentIndex);
          currentIndex = currentIndex + nextStep;
        }
        return iteratorResult(value);
      }
    };
  }
};

/**
 * Returns an `IteratorResult` object as per the following rules:
 *
 * - If `value` is not `undefined`, `done` is `false`.
 * - If `value` is `undefined`, `done` is `true`. In this case, `value` may be omitted.
 *
 * @param {*|undefined} value
 * @returns {IteratorResult}
 */
function iteratorResult(value) {
  return {
    value: value,
    done: value === undefined
  };
}
