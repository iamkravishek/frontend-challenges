# EventEmitter from Scratch

Simple JavaScript implementation of an EventEmitter for machine coding practice.

## What I implemented

- `on()` - register an event listener
- `emit()` - trigger an event and call its listeners
- `off()` - remove a specific listener
- `once()` - run a listener only once

## Basic idea

I am storing events in a `Map`.

```text
event name → listeners[]

"data" → [handler1, handler2]
"login" → [handler3]
```

When `emit()` is called, I get the listeners for that event and execute them.

## Example

```js
const emitter = new EventEmitter();

const handler = (...args) => {
    console.log(args);
};

emitter.on("data", handler);

emitter.emit("data", "A", "B");
// ["A", "B"]

emitter.off("data", handler);

emitter.emit("data", "C");
// nothing
```

### once()

```js
emitter.once("login", () => {
    console.log("Logged in");
});

emitter.emit("login");
// Logged in

emitter.emit("login");
// nothing
```

## Important things I learned

- `Map.has()` returns `true/false`, while `Map.get()` gives the stored value.
- Keep the event structure consistent: `event → array of handlers`.
- Use `splice()` to remove an item from an array. `delete` creates a sparse array.
- `once()` can be implemented using a wrapper function.
- `[...handlers]` creates a snapshot before `emit()` starts iterating.
- Functions are stored and compared by reference.

## Complexity

- `on()` → O(1) average
- `off()` → O(n)
- `emit()` → O(n)
- `once()` → O(1) average

## Files

```text
index.html
README.md
```

This was built as part of my JavaScript machine-coding practice.