class r extends Array{constructor(...r){super(...Array.isArray(arguments[0])?arguments[0]:r)}entries(){return this._iterableIterator((r=>[r,this[r]]))}forEachReverse(r,e){for(const[t,s]of this.entries().reverseIterator())r.call(e,s,t,this)}keys(){return this._iterableIterator((r=>r))}reverseIterator(){return this.values().reverseIterator()}values(){return this._iterableIterator((r=>this[r]))}[Symbol.iterator](){return this.values()}get[Symbol.toStringTag](){return"ReverseIterableArray"}iteratorFor(r){return this._iterableIterator((r=>[r,this[r]]),r)}_iterableIterator(r,e){let t=void 0!==e?e:0;const s=this.length-1;let a=1;return{reverseIterator(){return t=void 0!==e?e:s,a=-1,this},[Symbol.iterator](){return this},next(){let e;return 0<=t&&t<=s&&(e=r(t),t+=a),{value:e,done:void 0===e}}}}}export{r as default};
