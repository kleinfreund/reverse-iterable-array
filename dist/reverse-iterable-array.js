!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).ReverseIterableArray={})}(this,(function(e){"use strict";class r extends Array{constructor(...e){super(...Array.isArray(arguments[0])?arguments[0]:e)}entries(){return this._iterableIterator((e=>[e,this[e]]))}forEachReverse(e,r){for(const[t,o]of this.entries().reverseIterator())e.call(r,o,t,this)}keys(){return this._iterableIterator((e=>e))}reverseIterator(){return this.values().reverseIterator()}values(){return this._iterableIterator((e=>this[e]))}[Symbol.iterator](){return this.values()}get[Symbol.toStringTag](){return"ReverseIterableArray"}iteratorFor(e){return this._iterableIterator((e=>[e,this[e]]),e)}_iterableIterator(e,r){let t=void 0!==r?r:0;const o=this.length-1;let s=1;return{reverseIterator(){return t=void 0!==r?r:o,s=-1,this},[Symbol.iterator](){return this},next(){let r;return 0<=t&&t<=o&&(r=e(t),t+=s),function(e){return{value:e,done:void 0===e}}(r)}}}}e.default=r,Object.defineProperty(e,"__esModule",{value:!0})}));
