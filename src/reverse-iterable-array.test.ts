import ReverseIterableArray from './reverse-iterable-array.js'

describe('ReverseIterableArray', () => {
	test('Construct array without argument', () => {
		const array = new ReverseIterableArray()

		expect(array.length).toBe(0)
	})

	test('Construct array with array length', () => {
		const array = new ReverseIterableArray(3)

		expect(array.length).toBe(3)
		expect(array[0]).toBe(undefined)
		expect(array[1]).toBe(undefined)
		expect(array[2]).toBe(undefined)
	})

	test('Construct array with list of numbers', () => {
		const array = new ReverseIterableArray(1, 2, 3)

		expect(array.length).toBe(3)
		expect(array[0]).toBe(1)
		expect(array[1]).toBe(2)
		expect(array[2]).toBe(3)
	})

	test('Construct array with array of numbers', () => {
		const array = new ReverseIterableArray([1, 2, 3])

		expect(array.length).toBe(3)
		expect(array[0]).toBe(1)
		expect(array[1]).toBe(2)
		expect(array[2]).toBe(3)
	})

	test('Construct array with list of strings', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		expect(array.length).toBe(3)
		expect(array[0]).toBe('a')
		expect(array[1]).toBe('b')
		expect(array[2]).toBe('c')
	})

	test('array[Symbol.toStringTag]()', () => {
		const array = new ReverseIterableArray()

		expect(Object.prototype.toString.call(array)).toBe('[object ReverseIterableArray]')
	})

	test('array.forEach() with one-argument-callback', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.

		array.forEach(function (this: any, value) {
			expect(this).toBe(array)
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))

			lowerCaseCodePoint++
		}, array)
	})

	test('array.forEach() with two-argument-callback', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.
		let index = 0

		array.forEach(function (value, key) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)

			lowerCaseCodePoint++
			index++
		})
	})

	test('array.forEach() with three-argument-callback', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.
		let index = 0

		array.forEach(function (value, key, arrayReference) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)
			expect(arrayReference).toBe(array)

			lowerCaseCodePoint++
			index++
		})
	})

	test('array.forEach() with thisArg', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		const obj = {}

		array.forEach(function (this: any) {
			expect(this).toBe(obj)
		}, obj)
	})

	test('array.forEachReverse() with three-argument-callback and thisArg', () => {
		const array = new ReverseIterableArray('a', 'b', 'c')

		let lowerCaseCodePoint = 99 // 99 → "c", etc.
		let index = 2
		const obj = {}

		array.forEachReverse(function (this: any, value, key, arrayReference) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)
			expect(arrayReference).toBe(array)
			expect(this).toBe(obj)

			lowerCaseCodePoint--
			index--
		}, obj)
	})

	test('array[Symbol.iterator]()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		expect(ReverseIterableArray.prototype.hasOwnProperty(Symbol.iterator)).toBe(true)

		const iterator = array[Symbol.iterator]()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.reverseIterator()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		const iterator = array.reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.entries()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		const iterator = array.entries()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.keys()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		const iterator = array.keys()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(0)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(1)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(2)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.values()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		const iterator = array.values()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.entries().reverseIterator()', () => {
		const array = new ReverseIterableArray('Hello?', 'Are you still there?', 'I see you')

		const iterator = array.entries().reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.iteratorFor()', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		const iterator = array.iteratorFor(2)
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('c')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(3)
		expect(iteratorResult.value[1]).toBe('d')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(4)
		expect(iteratorResult.value[1]).toBe('e')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('array.iteratorFor().reverseIterator()', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		const iterator = array.iteratorFor(2).reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('c')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('b')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('a')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('Spread operator: [...array]', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		expect([...array]).toEqual(['a', 'b', 'c', 'd', 'e'])
	})

	test('Spread operator: [...array.reverseIterator()]', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		expect([...array.reverseIterator()]).toEqual(['e', 'd', 'c', 'b', 'a'])
	})

	test('Spread operator: [...array.entries()]', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		expect([...array.entries()]).toEqual([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e']
		])
	})

	test('Spread operator: [...array.keys()]', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		expect([...array.keys()]).toEqual([0, 1, 2, 3, 4])
	})

	test('Spread operator: [...array.values()]', () => {
		const array = new ReverseIterableArray('a', 'b', 'c', 'd', 'e')

		expect([...array.values()]).toEqual(['a', 'b', 'c', 'd', 'e'])
	})
})
