---
title: async JavaScript, gotchas and patterns
theme: white
revealOptions:
  controls: false
---

# Async JavaScript

## :closed_umbrella: Patterns and Gotchas :umbrella:

---

Hugo Di Francesco

Engineer at Concrete.cc

Slides: [codewithhugo.com/async-js](https://codewithhugo.com/async-js)

Twitter: [@hugo__df](https://twitter.com/hugo__df)

---

## Contents :whale:

1. Asynchronicity in JavaScript (a history lesson)
2. Why `async/await`?
3. Gotchas
4. Patterns

---

## Asynchronicity in JavaScript :alien:

Primitives:
- Callbacks
- Promises
- (Observables)
- `async/await`

----

What's asynchronous in a web application?

<fragment>**tl;dr** Most things</fragment>
----

<fragment>1. any network calls (HTTP, database)</fragment>
<fragment>2. timers (`setTimeout`, `setInterval`)</fragment>
<fragment>3. filesystem access</fragment>
<fragment>... Anything else that can be offloaded</fragment>

----

In JavaScript, these operations are non-blocking.

HTTP Request in Python: 

<sample path="./samples/20-http-request.py"></sample>

HTTP Request in JavaScript:

<sample path="./samples/21-http-request.js"></sample>

----

Why non-blocking I/O?

You don't want to freeze your UI while you wait.

<fragment>Non-blocking -> waiting doesn't cost you compute cycles.</fragment>


----

How non-blocking I/O is implemented (in JavaScript):

- pass a "callback" function
- it's called with the outcome of the async operation

---

## Node-style callbacks :candy:

<sample path="./samples/30-node-callbacks.js"></sample>

----

A callback is:

- "just" a function
- in examples, usually anonymous functions (pass `function () {}` directly)
- according to some style guides, should be an arrow function (`() => {}`)
- called when the async operation finishes

----

A Node-style callback is:

- called with any error(s) as the first argument/parameter, if there's no error, `null` is passed
- called with any number of "output" data as the other arguments

ie. `(err, data) => { /* more logic */ }`

---

## Node-style callbacks: problems :hamster:

----

### 1. Callback *hell* :arrow_double_up:

<sample path="./samples/40-callback-hell.js"></sample>

----

For each asynchronous operation: 
- extra level of indent
- lots of names for async output: `data`, `secondData`

----

### 2. Shadowing variables :ghost:

<sample path="./samples/40-callback-hell.js"></sample>

- `err` (in `myAsyncFn` callback) !== `err` (in `myOtherAsyncFn` callback) despite having the same name
----


### 3. Duplicated error handling :snowflake:

- 1 call to `handle(err)` per operation

<sample path="./samples/40-callback-hell.js"></sample>



----

### 4. Swallowed errors :loud_sound:

Ideal failure:
- fail early
- fail fast
- fail loud

----

Spot the unhandled error:

<sample path="./samples/41-callback-error-swallow.js"></sample>

----

**Silent error** 

<sample path="./samples/42-swallowed-error.js"></sample>

- `err` doesn't get handled
- 🤞 hope your linter caught that

----

## Callback problems :telephone_receiver:

1. Callback hell (indents 👎)
2. Shadowed variables
3. Duplicated error-handling
4. Swallowed errors

---

## Bring on the Promise :pray: 

----

<sample path="./samples/50-promise-flow.js"></sample>

----

Pros: Chainable

no crazy indent stuff

<sample path="./samples/50-promise-flow.js"></sample>

----

Pros: Single error handler

`.catch` once on the chain

<sample path="./samples/50-promise-flow.js"></sample>

----

Pros: lots of tightly scoped functions

Small functions are usually easier to understand

<sample path="./samples/50-promise-flow.js"></sample>

----

Cons:

- Lots of tightly scoped functions
- Very verbose way of returning multiple things.

<sample path="./samples/51-promise-cons.js"></sample>

----

## Promise gotchas :thumbsup:

----

Gotcha: 🙅‍♀️ nesting them is super tempting.

<sample path="./samples/52-nested-promises.js"></sample>

----

Solution: Avoid the Pyramid of Doom ☠️

<sample path="./samples/53-promises-flatten.js"></sample>

<div style="text-align: left">Promises "flatten": </div>
- you can return a Promise from a `then` and keep chaining

----

Gotcha: `onRejected` callback

The following works:

<sample path="./samples/54-avoid-on-rejected.js"></sample>

But we're back to doing per-operation error-handling like in callbacks (potentially swallowing errors etc.)

----

Solution: avoid it, in favour of `.catch`

<sample path="./samples/55-use-catch.js"></sample>

_Unless you specifically need it_

----

### Promise :thumbsdown: recap :taxi:

- Lots of tightly scoped functions
- Very verbose way of returning/passing multiple things

<sample path="./samples/56-promise-cons-recap.js"></sample>

---

## async/await :footprints:

----

<sample path="./samples/60-async-await.js"></sample>

----

Given a Promise (or any object that has a `.then` function), `await` takes the value passed to the callback in `.then`

----

- `await` can only be used inside a function that is `async` *

<sample path="./samples/61-await-in-async-fn.js"></sample>

<div style="text-align:left; font-size: 80%">\* top-level (ie. outside of async functions) await is coming</div>

----

- `async` functions are "just" Promises


<sample path="./samples/62-async-fn-examples.js"></sample>

----

### Loop through sequential calls :repeat:

----

With async/await:

<sample path="./samples/63-async-loop.js"></sample>

With promises:

<sample path="./samples/64-promise-loop.js"></sample>

----

### Share data between calls :bath:

<sample path="./samples/65-same-example.js"></sample>

We don't have the whole

<sample path="./samples/66-promise-data-passing.js"></sample>

----

### Error handling :microphone:

<sample path="./samples/67-error-handling.js"></sample>

----

## Cons of `async`/`await` :sign_of_the_horns:

- Browser support is only good in latest/modern browsers
  - polyfills (async-to-gen, regenerator runtime) are sort of big
  - supported in Node 8+ though 🤷‍♀️
- Keen functional programming people would say it leads to a more "imperative" style of programming

---

## Gotchas :desert:

----

### Creating an error :pouch:

- `throw`-ing inside an `async` function and `Promise.reject` work the same
- `.reject` and `throw` `Error` objects please 🙏

<sample path="./samples/80-throw-promise-reject.js"></sample>


----

### What happens when you forget `await`? :octopus:

- values are undefined
- `TypeError: x.fn is not a function`

<sample path="./samples/81-forgot-await.js"></sample>

----

### What happens when you forget `await`? :octopus:

- console.log of Promise/async function
- \*inserts 100th reminder\*: an `async` function is a Promise

<sample path="./samples/82-forgot-await-log.js"></sample>

----

### Promises evaluate eagerly :sparkles:

- Promises don't wait for anything to execute, when you create it, it runs:

<sample path="./samples/83-eager-promises.js"></sample>

----

### Testing gotchas :orange_book:

- Jest supports Promises as test output (therefore also `async` functions)
- what if your test fails?

<sample path="./samples/84-testing-danger.js"></sample>

----

### Testing gotchas :orange_book:

- _BUT_ do your cleanup in "before/after" hooks, async test bodies crash and don't clean up which might make multiple tests fail

<sample path="./samples/85-clean-tests.js"></sample>

---

## Patterns :city_sunset:

A lot of these are to avoid the pitfalls we've looked in the "gotchas" section.

----

### Running promises in parallel :running:

- `Promise.all`

<sample path="./samples/70-fetch-parallel.js"></sample>

----

### Running promises in parallel :running:

- `Promise.all` + `map` over an `async` function
- Good for logging or when you've got non-trivial/business logic 

<sample path="./samples/71-fetch-parallel-async.js"></sample>

----

### Delay execution of a promise :hand:

- Promises are eager, they just wanna run!
- Use a function that returns the Promise

<sample path="./samples/72-delay-fetch.js"></sample>

- No Promise, no eager execution
- Fancy people call the above "thunk"

----

### Separate synchronous and asynchronous operations :horse_racing:

async fetch > do stuff in memory > async write back

<sample path="./samples/73-separate-async-sync.js"></sample>

----

### Running promises sequentially :closed_lock_with_key:

- using recursion + rest/spread and way too much bookkeeping

<sample path="./samples/74-promises-sequence.js"></sample>

----

### Running promises sequentially :closed_lock_with_key:

- using `await` + a loop?

<sample path="./samples/75-async-sequence.js"></sample>

----

### Passing data in sequential async calls :floppy_disk:

- return array + destructuring in next call, very verbose in Promise chains

<sample path="./samples/76-pass-data-promise-all.js"></sample>

----

### Passing data in sequential async calls :floppy_disk:

- `await` + data in the closure

<sample path="./samples/77-data-in-closure.js"></sample>

----

### Error handling :x:

- try/catch, or `.catch` 🤷‍♀️

<sample path="./samples/78-catch.js"></sample>

---

## Workshop :knife:

- "callbackify"-ing a Promise-based API 🙈
- getting data in parallel using callbacks 💊
- "promisify"-ing a callback-based API (read/write file)
- Why we don't mix async and sync operations

---

## Further Reading :book:

- Slides/write up (including workshop examples) at [codewithhugo.com/async-js](https://codewithhugo.com/async-js)
- About non-blocking I/O in Node.js docs: [nodejs.org/en/docs/guides/blocking-vs-non-blocking/](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)
- [Async JavaScript: From Callbacks, to Promises, to Async/Await](https://tylermcginnis.com/async-javascript-from-callbacks-to-promises-to-async-await/) - Tyler McGinnis
