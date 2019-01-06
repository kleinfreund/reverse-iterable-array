import { ReverseIterableArray } from '../src/reverse-iterable-array.mjs';
import { TestRunner } from './test-runner.mjs';

function tests() {
  const testRunner = new TestRunner();
  console.group('Tests');
  console.info('Running tests …');

  const array = new ReverseIterableArray('1', '2', '3');

  console.group('array[]');
  testRunner.assertEqual('array.length', 3, array.length);
  testRunner.assertEqual('array[0]', '1', array[0]);
  testRunner.assertEqual('array[1]', '2', array[1]);
  testRunner.assertEqual('array[2]', '3', array[2]);
  console.groupEnd();

  array.splice(0, array.length);

  console.group('Iterables & Iterators');
  array.push('4', '5', '6');

  console.group('array');
  testRunner.assertHasOwnProperty('ReverseIterableArray.prototype', Symbol.iterator, ReverseIterableArray.prototype);
  console.groupEnd();

  console.group('array.entries()');
  const entries = array.entries();
  console.info('> const entries = array.entries();');
  testRunner.assertHasOwnProperty('entries', 'next', entries);
  testRunner.assertHasOwnProperty('entries', Symbol.iterator, entries);

  let entriesNext = entries.next();
  console.info('> let entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 0, entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '4', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 1, entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '5', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 2, entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '6', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertEqual('entriesNext.done', true, entriesNext.done);
  console.groupEnd();

  console.group('array.keys()');
  const keys = array.keys();
  console.info('> const keys = array.keys();');
  testRunner.assertHasOwnProperty('keys', 'next', keys);
  testRunner.assertHasOwnProperty('keys', Symbol.iterator, keys);

  let keysNext = keys.next();
  console.info('> let keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 0, keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 1, keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 2, keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertEqual('keysNext.done', true, keysNext.done);
  console.groupEnd();

  console.group('array.values()');
  const values = array.values();
  console.info('> const values = array.values();');
  testRunner.assertHasOwnProperty('values', 'next', values);
  testRunner.assertHasOwnProperty('values', Symbol.iterator, values);

  let valuesNext = values.next();
  console.info('> let valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '4', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '5', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '6', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertEqual('valuesNext.done', true, valuesNext.done);
  console.groupEnd();

  console.group('array.entries().reverseIterator()');
  const entriesReverse = array.entries().reverseIterator();
  console.info('> const entriesReverse = array.entries().reverseIterator();');
  testRunner.assertHasOwnProperty('entriesReverse', 'next', entriesReverse);
  testRunner.assertHasOwnProperty('entriesReverse', Symbol.iterator, entriesReverse);

  let entriesReverseNext = entriesReverse.next();
  console.info('> let entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 2, entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '6', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 1, entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '5', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 0, entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '4', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', true, entriesReverseNext.done);
  console.groupEnd();

  testRunner.assertEqual('Object.prototype.toString.call(new ReverseIterableArray())', '[object ReverseIterableArray]', Object.prototype.toString.call(new ReverseIterableArray()));
  console.groupEnd();

  testRunner.printResults();
  console.groupEnd();
}

tests();
