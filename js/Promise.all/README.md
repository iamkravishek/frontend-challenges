# Promise.all() Polyfill — JavaScript

A production-style implementation of the native `Promise.all()` method built from scratch to understand asynchronous JavaScript, closures, promises, and polyfills.

---

## 📌 Problem Statement

Implement a custom version of `Promise.all()` that:

* Accepts an array of promises and/or normal values.
* Returns a single Promise.
* Resolves when **all** inputs resolve.
* Rejects immediately when **any** input rejects.
* Preserves the **input order** of results regardless of the resolution order.

---

## ✨ Features

* Supports promises and non-promise values.
* Preserves input order.
* Handles asynchronous resolution correctly.
* Rejects immediately on the first failure.
* Handles empty input.
* Time Complexity: **O(n)**
* Space Complexity: **O(n)**

---


## ⚠️ Edge Cases

* Empty array
* Single promise
* Multiple promises
* Plain values
* Mixed values and promises
* First promise rejects
* Last promise rejects
* Different resolution timings

---

## 🤔 Why `Promise.resolve()`?

`Promise.all()` accepts both promises and plain values.

Using `Promise.resolve()` normalizes every input into a Promise so the implementation can safely treat all inputs the same way.

---



## 📚 What I Learned

While implementing this polyfill, I gained a deeper understanding of:

* How `Promise.all()` works internally.
* Why closures are essential for sharing asynchronous state.
* How `Promise.resolve()` normalizes mixed inputs.
* Why preserving input order requires indexing instead of `push()`.
* How multiple asynchronous callbacks coordinate through shared state.

---

