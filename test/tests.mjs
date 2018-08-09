import { ReverseIterableArray } from '../src/reverse-iterable-array.mjs';

let totalAssertions = 0;
let correctAssertions = 0;

function assert(condition, message) {
  totalAssertions++;

  if (condition) {
    correctAssertions++;
  }

  console.assert(condition, message);
}

function assertEqual(expression, exptected, actual, message) {
  const condition = exptected === actual;
  console.info(`${expression}: ${actual} === ${exptected}? ${statusMark(condition)}`);
  assert(condition, `Expect ${expression} to be ${exptected} but it was ${actual}.`);
}

function assertHasOwnProperty(expression, property, object) {
  const condition = object.hasOwnProperty(property);
  console.info(
    `${expression}: ${expression}.hasOwnProperty(${property.toString()})? ${statusMark(condition)}`
  );
  assert(
    condition,
    `Expect ${expression} to have a property ${property.toString()} but it doesn’t.`
  );
}

function statusMark(condition) {
  return condition ? '✓' : '✗';
}

console.group('Tests');
console.info('Running tests …');

const array = new ReverseIterableArray('1', '2', '3');

console.group('array[]');
assertEqual('array.length', 3, array.length);
assertEqual('array[0]', '1', array[0]);
assertEqual('array[1]', '2', array[1]);
assertEqual('array[2]', '3', array[2]);
console.groupEnd();

array.splice(0, array.length);

console.group('Iterables & Iterators');
array.push('4', '5', '6');

console.group('array');
assertHasOwnProperty('ReverseIterableArray.prototype', Symbol.iterator, ReverseIterableArray.prototype);
console.groupEnd();

console.group('array.entries()');
const entries = array.entries();
console.info('> const entries = array.entries();');
assertHasOwnProperty('entries', 'next', entries);
assertHasOwnProperty('entries', Symbol.iterator, entries);

let entriesNext = entries.next();
console.info('> let entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 0, entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '4', entriesNext.value[1]);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 1, entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '5', entriesNext.value[1]);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 2, entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '6', entriesNext.value[1]);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertEqual('entriesNext.done', true, entriesNext.done);
console.groupEnd();

console.group('array.keys()');
const keys = array.keys();
console.info('> const keys = array.keys();');
assertHasOwnProperty('keys', 'next', keys);
assertHasOwnProperty('keys', Symbol.iterator, keys);

let keysNext = keys.next();
console.info('> let keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 0, keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 1, keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 2, keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertEqual('keysNext.done', true, keysNext.done);
console.groupEnd();

console.group('array.values()');
const values = array.values();
console.info('> const values = array.values();');
assertHasOwnProperty('values', 'next', values);
assertHasOwnProperty('values', Symbol.iterator, values);

let valuesNext = values.next();
console.info('> let valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '4', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '5', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '6', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertEqual('valuesNext.done', true, valuesNext.done);
console.groupEnd();

console.group('array.entries().reverse()');
const entriesReverse = array.entries().reverse();
console.info('> const entriesReverse = array.entries().reverse();');
assertHasOwnProperty('entriesReverse', 'next', entriesReverse);
assertHasOwnProperty('entriesReverse', Symbol.iterator, entriesReverse);

let entriesReverseNext = entriesReverse.next();
console.info('> let entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 2, entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '6', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 1, entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '5', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 0, entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '4', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertEqual('entriesReverseNext.done', true, entriesReverseNext.done);
console.groupEnd();

assertEqual('Object.prototype.toString.call(new ReverseIterableArray())', '[object ReverseIterableArray]', Object.prototype.toString.call(new ReverseIterableArray()));
console.groupEnd();

console.info(
  `Done. ${correctAssertions}/${totalAssertions} tests passed. ${
    correctAssertions === totalAssertions ? '🎉🎉🎉' : ''
  }`
);
console.groupEnd();
