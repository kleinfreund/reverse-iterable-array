/**
 * A reverse-iterable array implementation based on the built-in [`Array`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. As per `Array`, the order of a `ReverseIterableArray` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export default class ReverseIterableArray<T> extends Array<T> {
  /**
   * An [iterable][1] object that accepts any value as elements and has non-negative integers as
   * indices.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
   */
  constructor(...arrayLengthOrElements: Array<Array<T>> | Array<T>) {
    const arrayArgument = Array.isArray(arguments[0]) ? arguments[0] : arrayLengthOrElements
    super(...arrayArgument)
  }

  /**
   * The `entries()` method returns a new [Iterator][1] object that contains the `[index, element]`
   * pairs for each element in a `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  entries(): ReverseIterableIterator<[number, T]> {
    const getIteratorValue = (index: number): [number, T] => [index, this[index] as T];

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * The `forEachReverse()` method executes a provided function once per each index/element pair in
   * the `ReverseIterableArray` object, in reverse insertion order.
   *
   * @param callbackfn
   * @param thisArg
   */
  forEachReverse(
    callbackfn: (value: T, index: number, array: ReverseIterableArray<T>) => void,
    thisArg?: any
  ) {
    for (const [index, value] of this.entries().reverseIterator()) {
      callbackfn.call(thisArg, value, index, this);
    }
  }

  /**
   * The `keys()` method returns a new [Iterator][1] object that contains the index for each
   * element in a `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  keys(): ReverseIterableIterator<number> {
    const getIteratorValue = (index: number): number => index;

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * Allows usage of the [iteration protocols][1] for reverse iteration.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   */
  reverseIterator(): IterableIterator<T> {
    return this.values().reverseIterator();
  }

  /**
   * The `values()` method returns a new [iterator][1] object that contains the elements in a
   * `ReverseIterableArray` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  values(): ReverseIterableIterator<T> {
    const getIteratorValue = (index: number): T => this[index] as T;

    return this._iterableIterator(getIteratorValue);
  }

  /**
   * The initial value of the [@@iterator][1] property is the same function object as the initial
   * value of the entries property.
   *
   * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
   */
  [Symbol.iterator](): ReverseIterableIterator<T> {
    return this.values();
  }

  /**
   * The [`@@toStringTag`][1] property is accessed internally `Object.prototype.toString()`.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
   *
   * @returns The string tag of the `ReverseIterableArray` class.
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
   * @param index The index of the element to start iterating from.
   */
  iteratorFor(index: number): ReverseIterableIterator<[number, T]> {
    const getIteratorValue = (index: number): [number, T] => [index, this[index] as T];

    return this._iterableIterator(getIteratorValue, index);
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
   * @param getIteratorValue
   * @param startIndex Index of the element to start iterating from
   * @returns a reverse-iterable iterator
   */
  private _iterableIterator(
    getIteratorValue: (index: number) => [number, T] | number | T,
    startIndex?: number
  ): ReverseIterableIterator<any> {
    let currentIndex = startIndex !== undefined ? startIndex : 0;
    // Store the last array index because inside the reverseIterator() method, `this` will be
    // bound to the `iterableIterator` method, not the `ReverseIterableArray` object.
    const lastIndex = this.length - 1;
    let nextStep = 1;

    return {
      reverseIterator() {
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
          currentIndex += nextStep;
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
 */
function iteratorResult<T>(value: T): IteratorResult<T> {
  return {
    value: value,
    done: value === undefined
  };
}

/**
 * Custom `IterableIterator` interface including a `reverseIterator` function.
 * Should reverse-iteration make it into ECMAScript, this function would probably be named
 * `[Symbol.reverseIterator]`.
 */
interface ReverseIterableIterator<T> extends IterableIterator<T> {
  reverseIterator(): IterableIterator<T>;
}
