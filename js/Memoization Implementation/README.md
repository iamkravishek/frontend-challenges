# Memoization Polyfill in JavaScript

> A generic implementation of `memoize()` built from first principles to understand **closures, higher-order functions, caching, rest/spread operators, and `Map`**.

---

## 📌 What is Memoization?

Memoization is an optimization technique that stores the result of expensive function calls and returns the cached result when the same input is provided again.

Instead of recomputing the same work repeatedly, we reuse the previously computed result.

---

## 🎯 Problem Statement

Given any function, implement a generic `memoize()` utility that:

* Accepts any function.
* Supports any number of arguments.
* Caches computed results.
* Returns cached values for repeated inputs.

---

## 🧠 JavaScript Concepts Used

* Higher Order Functions
* Closures
* Rest Parameters (`...args`)
* Spread Operator (`...args`)
* `Map`
* `JSON.stringify()`
* Function Invocation
* Reference vs Value Equality

---

## 🏗️ High-Level Approach

```text
Receive Original Function
        ↓
Create Persistent Cache (Map)
        ↓
Return Wrapper Function
        ↓
Collect Arguments (...args)
        ↓
Generate Cache Key
        ↓
Cache Hit?
   ↙          ↘
 Yes          No
 ↓             ↓
Return      Execute Original Function
Cached           ↓
Value        Store Result
                 ↓
           Return Result
```



## 💡 Why Generate a Cache Key?

The cache works as:

```text
Key
 ↓
Value
```

Different argument combinations should produce different keys.

For this implementation, the key is generated using:

```javascript
JSON.stringify(args)
```

This converts the argument list into a stable string representation suitable for cache lookup.

---


## ⏱️ Complexity

### Cache Hit

* Key Generation: O(serialization)
* Cache Lookup: O(1)

### Cache Miss

* Key Generation: O(serialization)
* Original Function Execution
* Cache Insert: O(1)

### Space Complexity

```
O(n)
```

where `n` is the number of unique cached inputs.


---



## 📚 Key Learning

The biggest takeaway from this implementation wasn't writing the code—it was learning how to derive the solution from first principles.

Instead of asking:

> "What API should I use?"
