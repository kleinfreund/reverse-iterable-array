import test from 'ava';
import ReverseIterableArray from '../src/reverse-iterable-array';

test('Construct array without argument', t => {
  const array = new ReverseIterableArray();

  t.is(array.length, 0, 'Array is empty.');
});

test('Construct array with array length', t => {
  const array = new ReverseIterableArray(3);

  t.is(array.length, 3, 'Array has three elements.');
  t.is(array[0], undefined);
  t.is(array[1], undefined);
  t.is(array[2], undefined);
});

test('Construct array with list of numbers', t => {
  const array = new ReverseIterableArray(1, 2, 3);

  t.is(array.length, 3, 'Array has three elements.');
  t.is(array[0], 1);
  t.is(array[1], 2);
  t.is(array[2], 3);
});

test('Construct array with array of numbers', t => {
  const array = new ReverseIterableArray([1, 2, 3]);

  t.is(array.length, 3, 'Array has three elements.');
  t.is(array[0], 1);
  t.is(array[1], 2);
  t.is(array[2], 3);
});

test('Construct array with list of strings', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  t.is(array.length, 3, 'Array has three elements.');
  t.is(array[0], 'a');
  t.is(array[1], 'b');
  t.is(array[2], 'c');
});

test('array[Symbol.toStringTag]()', t => {
  const array = new ReverseIterableArray();

  t.is(Object.prototype.toString.call(array), '[object ReverseIterableArray]');
});

test('array.forEach() with one-argument-callback', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

  array.forEach(function (value) {
    t.is(this, array);
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));

    lowerCaseCodePoint++;
  }, array);
});

test('array.forEach() with two-argument-callback', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.
  let index = 0;

  array.forEach(function (value, key) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);

    lowerCaseCodePoint++;
    index++;
  });
});

test('array.forEach() with three-argument-callback', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.
  let index = 0;

  array.forEach(function (value, key, arrayReference) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);
    t.is(arrayReference, array);

    lowerCaseCodePoint++;
    index++;
  });
});

test('array.forEach() with thisArg', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  const obj = {};

  array.forEach(function () {
    t.is(this, obj);
  }, obj);
});

test('array.forEachReverse() with three-argument-callback and thisArg', t => {
  const array = new ReverseIterableArray('a', 'b', 'c');

  let lowerCaseCodePoint = 99; // 99 → "c", etc.
  let index = 2;
  const obj = {};

  array.forEachReverse(function (value, key, arrayReference) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);
    t.is(arrayReference, array);
    t.is(this, obj);

    lowerCaseCodePoint--;
    index--;
  }, obj);
});

test('array[Symbol.iterator]()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  t.true(ReverseIterableArray.prototype.hasOwnProperty(Symbol.iterator));

  const iterator = array[Symbol.iterator]();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.reverseIterator()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  const iterator = array.reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'I see you');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Hello?');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.entries()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  const iterator = array.entries();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.keys()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  const iterator = array.keys();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 0);

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 1);

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 2);

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.values()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  const iterator = array.values();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.entries().reverseIterator()', t => {
  const array = new ReverseIterableArray(
    'Hello?', 'Are you still there?', 'I see you'
  );

  const iterator = array.entries().reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.iteratorFor()', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  const iterator = array.iteratorFor(2);
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 3);
  t.is(iteratorResult.value[1], 'd');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 4);
  t.is(iteratorResult.value[1], 'e');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('array.iteratorFor().reverseIterator()', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  const iterator = array.iteratorFor(2).reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'a');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('Spread operator: [...array]', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  t.deepEqual([...array], ['a', 'b', 'c', 'd', 'e']);
});

test('Spread operator: [...array.reverseIterator()]', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  t.deepEqual(
    [...array.reverseIterator()],
    ['e', 'd', 'c', 'b', 'a']
  );
});

test('Spread operator: [...array.entries()]', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  t.deepEqual([...array.entries()], [
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);
});

test('Spread operator: [...array.keys()]', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  t.deepEqual([...array.keys()], [0, 1, 2, 3, 4]);
});

test('Spread operator: [...array.values()]', t => {
  const array = new ReverseIterableArray(
    'a', 'b', 'c', 'd', 'e'
  );

  t.deepEqual([...array.values()], ['a', 'b', 'c', 'd', 'e']);
});
