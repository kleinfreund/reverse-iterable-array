/**
 * @template T
 * @typedef {import('../types/index.d.js').ReverseIterableIterator<T>} ReverseIterableIterator
 */

/**
 * A reverse-iterable array implementation based on the built-in [`Array`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards iteration. As per `Array`, the order of a `ReverseIterableArray` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 *
 * @template T
 */
export default class ReverseIterableArray extends Array {
	/**
	 * An [iterable][1] object that accepts any value as elements and has non-negative integers as indices.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
	 *
	 * @param {T[][] | T[]} arrayLengthOrElements
	 */
	constructor(...arrayLengthOrElements) {
		const arrayArgument = Array.isArray(arguments[0]) ? arguments[0] : arrayLengthOrElements
		super(...arrayArgument)
	}

	/**
	 * The `entries()` method returns a new [Iterator][1] object that contains the `[index, element]`
	 * pairs for each element in a `ReverseIterableArray` object in insertion order.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @returns {ReverseIterableIterator<[number, T]>}
	 */
	entries() {
		const getIteratorValue = /** @type {(index: number) => [number, T]} */ (index) => [index, /** @type {T} */ (this[index])]

		return this._iterableIterator(getIteratorValue)
	}

	/**
	 * The `forEachReverse()` method executes a provided function once per each index/element pair in the `ReverseIterableArray` object, in reverse insertion order.
	 *
	 * @param {(value: T, index: number, array: ReverseIterableArray<T>) => void} callbackfn
	 * @param {any} [thisArg]
	 */
	forEachReverse(callbackfn, thisArg) {
		for (const [index, value] of this.entries().reverseIterator()) {
			callbackfn.call(thisArg, value, index, this)
		}
	}

	/**
	 * The `keys()` method returns a new [Iterator][1] object that contains the index for each element in a `ReverseIterableArray` object in insertion order.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @returns {ReverseIterableIterator<number>}
	 */
	keys() {
		const getIteratorValue = /** @type {(index: number) => number} */ (index) => index

		return this._iterableIterator(getIteratorValue)
	}

	/**
	 * Allows usage of the [iteration protocols][1] for reverse iteration.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
	 *
	 * @returns {IterableIterator<T>}
	 */
	reverseIterator() {
		return this.values().reverseIterator()
	}

	/**
	 * The `values()` method returns a new [iterator][1] object that contains the elements in a `ReverseIterableArray` object in insertion order.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @returns {ReverseIterableIterator<T>}
	 */
	values() {
		const getIteratorValue = /** @type {(index: number) => T} */ (index) => /** @type {T} */(this[index])

		return this._iterableIterator(getIteratorValue)
	}

	/**
	 * The initial value of the [@@iterator][1] property is the same function object as the initial value of the entries property.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
	 *
	 * @returns {ReverseIterableIterator<T>}
	 */
	[Symbol.iterator]() {
		return this.values()
	}

	/**
	 * The [`@@toStringTag`][1] property is accessed internally `Object.prototype.toString()`.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
	 *
	 * @returns {string} The string tag of the `ReverseIterableArray` class.
	 */
	get [Symbol.toStringTag]() {
		return 'ReverseIterableArray'
	}

	/**
	 * The `iteratorFor()` method returns a new [iterator][1] object that contains the `[index, element]` pairs for each element in a `ReverseIterableArray` object in insertion order **starting with the pair specified by the `index` parameter**.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
	 *
	 * @param {number} index The index of the element to start iterating from.
	 * @returns {ReverseIterableIterator<[number, T]>}
	 */
	iteratorFor(index) {
		const getIteratorValue = /** @type {(index: number) => [number, T]} */ (index) => [index, /** @type {T} */ (this[index])]

		return this._iterableIterator(getIteratorValue, index)
	}

	/**
	 * Returns an object which is both an iterable and an iterator. It fulfills the requirements of the [iteration protocols][1] plus allowing reverse-iteration.
	 *
	 * - **Iterator requirements**: An object that implements a function `next`. This function returns an object with two properties: `value` and `done`.
	 *
	 * - **Iterable requirements**: An object that implements a function `[Symbol.iterator]()`. This function returns an iterator.
	 *
	 * - **Reverse-iterable requirements**: An object that implements a function `reverse`. This function returns an iterator with the special behavior of iterating in reverse insertion order. This is non-standard behavior.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
	 *
	 * @param {(index: number) => [number, T] | number | T} getIteratorValue
	 * @param {number} [startIndex] Index of the element to start iterating from
	 * @returns {ReverseIterableIterator<any>} a reverse-iterable iterator
	 * @private
	 */
	_iterableIterator(getIteratorValue, startIndex) {
		let currentIndex = startIndex !== undefined ? startIndex : 0
		// Store the last array index because inside the reverseIterator() method, `this` will be
		// bound to the `iterableIterator` method, not the `ReverseIterableArray` object.
		const lastIndex = this.length - 1
		let nextStep = 1

		return {
			reverseIterator() {
				currentIndex = startIndex !== undefined ? startIndex : lastIndex
				nextStep = -1

				return this
			},

			[Symbol.iterator]() {
				// Return the iterable itself.
				return this
			},

			next() {
				let value

				if (0 <= currentIndex && currentIndex <= lastIndex) {
					value = getIteratorValue(currentIndex)
					currentIndex += nextStep
				}

				return {
					value,
					done: value === undefined,
				}
			},
		}
	}
}
