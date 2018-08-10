import { ReverseIterableArray } from '../src/reverse-iterable-array.mjs';

/**
 * Recursive algorithm to stringify arrays and their content in order to print them like dev tools.
 *
 * ```js
 * stringify(['1', '2', '3'])
 * //> [ "1", "2", "3" ]
 *
 * stringify([1, '2', undefined, '3', [4, 5, 6]])
 * //> [ 1, "2", undefined, "3", [ 4, 5, 6 ] ]
 * ```
 *
 * @param {*} input
 * @returns {String}
 */
function stringify(input) {
  if (Array.isArray(input)) {
    const stringArray = [];
    for (const element of input) {
      stringArray.push(stringify(element));
    }

    return `[ ${stringArray.join(', ')} ]`;
  } else if (typeof input === 'string') {
    return `"${input}"`;
  }

  return String(input);
}

/**
 * @param {String} command
 */
function printCommand(command) {
  printCodeBlock(command, 'command');
}

/**
 * @param {Array} args
 */
function printOutput(...args) {
  const output = args.map(arg => stringify(arg));
  printCodeBlock(output.join(' '), 'output');
}

/**
 * @param {Array} args
 */
function printLog(...args) {
  const output = args.map(arg => Array.isArray(arg) ? stringify(arg) : String(arg));
  printCodeBlock(output.join(' '), 'log');
}

/**
 * @param {String} content
 * @param {Array<String>} classNames
 */
function printCodeBlock(content, ...classNames) {
  let concatenatedLines = '';
  for (const line of content.trim().split('\n')) {
    concatenatedLines += `<code>${line}</code>\n`;
  }

  document.body.insertAdjacentHTML(
    'beforeend',
    `<pre class="${classNames.join(' ')}">${concatenatedLines}</pre>`
  );
}

function printExamples() {
  printCommand('const array = new ReverseIterableArray("1", "2", "3");');
  const array = new ReverseIterableArray('1', '2', '3');

  printCommand(`
for (const value of array) {
  console.log(value);
}
  `);

  for (const value of array) {
    printLog(value);
  }

  printCommand(`
for (const [index, value] of array.entries()) {
  console.log(index, ":", value);
}
  `);
  for (const [index, value] of array.entries()) {
    printLog(index, ':', value);
  }

  printCommand(`
for (const index of array.keys()) {
  console.log(index);
}
  `);
  for (const index of array.keys()) {
    printLog(index);
  }

  printCommand(`
for (const value of array.values()) {
  console.log(value);
}
  `);
  for (const value of array.values()) {
    printLog(value);
  }

  printCommand(`
for (const value of array.reverseIterator()) {
  console.log(value);
}
  `);
  for (const value of array.reverseIterator()) {
    printLog(value);
  }

  printCommand(`
for (const [index, value] of array.entries().reverseIterator()) {
  console.log(index, ":", value);
}
  `);
  for (const [index, value] of array.entries().reverseIterator()) {
    printLog(index, ':', value);
  }

  printCommand(`
for (const index of array.keys().reverseIterator()) {
  console.log(index);
}
  `);
  for (const index of array.keys().reverseIterator()) {
    printLog(index);
  }

  printCommand(`
for (const value of array.values().reverseIterator()) {
  console.log(value);
}
  `);
  for (const value of array.values().reverseIterator()) {
    printLog(value);
  }

  printCommand('[...array]');
  printOutput([...array]);

  printCommand('[...array.entries()]');
  printOutput([...array.entries()]);

  printCommand('[...array.keys()]');
  printOutput([...array.keys()]);

  printCommand('[...array.values()]');
  printOutput([...array.values()]);

  printCommand('[...array.reverseIterator()]');
  printOutput([...array.reverseIterator()]);

  printCommand('[...array.entries().reverseIterator()]');
  printOutput([...array.entries().reverseIterator()]);

  printCommand('[...array.keys().reverseIterator()]');
  printOutput([...array.keys().reverseIterator()]);

  printCommand('[...array.values().reverseIterator()]');
  printOutput([...array.values().reverseIterator()]);

  printCommand('array.length');
  printOutput(array.length);

  printCommand('array.splice(1, 1)');
  printOutput(array.splice(1, 1));

  printCommand('array.length');
  printOutput(array.length);

  printCommand('array.push("4", "5", "6")');
  array.push('4', '5', '6');

  printCommand('[...array.values()]');
  printOutput([...array.values()]);

  printCommand('const it = array.iteratorFor("key4").reverseIterator();');
  const it = array.iteratorFor(2).reverseIterator();
  printCommand('it.next().value;');
  printOutput(it.next().value);
  printCommand('it.next().value;');
  printOutput(it.next().value);
  printCommand('it.next().value;');
  printOutput(it.next().value);
  printCommand('it.next().value;');
  printOutput(it.next().value);

  printCommand(`
array.forEach((value, index) => {
  console.log(index, ":", value);
});
  `);
  array.forEach((value, index) => {
    printLog(index, ':', value);
  });

  printCommand(`
array.forEachReverse((value, index) => {
  console.log(index, ":", value);
});
  `);
  array.forEachReverse((value, index) => {
    printLog(index, ':', value);
  });

  printCommand('Object.prototype.toString.call(new ReverseIterableArray())');
  printOutput(Object.prototype.toString.call(new ReverseIterableArray()));

  printCommand('const array2 = new ReverseIterableArray(7);');
  const array2 = new ReverseIterableArray(7);

  printCommand('array2.length');
  printOutput(array2.length);
}

printExamples();
