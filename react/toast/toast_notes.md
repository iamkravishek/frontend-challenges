# Toast Notification System — 2 Min Recap

## 🧠 Mental Model

Button click
    ↓
Create toast + unique ID
    ↓
Add to notification[]
    ↓
Toast renders
    ↓
Manual close OR timer expires
    ↓
removeToast(id)
    ↓
Filter by ID


## 📦 State

notification = [
  {
    toastID,
    toastMessage,
    toastType
  }
]

Array → natural choice because toasts are stackable.


## ⚙️ Core Operations

showToast(type)
→ ADD toast

removeToast(id)
→ REMOVE specific toast


## 🔥 Important React Rule

If new state depends on previous state:

setNotification(prev => [...prev, newToast])

setNotification(prev =>
  prev.filter(item => item.toastID !== id)
)

REMEMBER:

New state depends on old state
        ↓
Use functional update → prev


## ⏱️ Auto Close

showToast()
    ↓
setTimeout()
    ↓
removeToast(toastID)

Timer callback should capture the toast ID.

Don't expect setTimeout to pass your ID automatically.


## ❌ Manual Close Mistake

onClick={removeToast}

React passes:
    event

NOT:
    toastID

Instead:

onClick={() => removeToast(item.toastID)}


## 🧩 Component Structure

App
 ├── Buttons → trigger toast
 │
 └── Toast
      └── toast-box
           ├── toast-item
           ├── toast-item
           └── toast-item


## 🎨 Styling

className={`toast-item ${item.toastType}`}

.toast-box {
  /* common positioning/layout */
}

.toast-box.success { }
.toast-box.warning { }
.toast-box.info { }
.toast-box.error { }


## 📍 Positioning

top-left
top-right
bottom-left
bottom-right

Prefer:

position: fixed

because Toast belongs to the viewport, not normal document flow.


# ♿ Accessibility

## WHY?

Toast is usually visual, but a screen-reader user may not see it.

When a new toast appears:

Visual user
    ↓
sees notification

Screen-reader user
    ↓
needs notification announced automatically

That's why we use ARIA live-region semantics.


## 🚨 role="alert"

Use on the INDIVIDUAL toast:

<div
  className="toast-item"
  role="alert"
>
  Payment successful
</div>

Meaning:

"Something important has appeared and should be
announced to assistive technology."

`role="alert"` is appropriate for:
- Errors
- Warnings
- Important status messages
- Success/failure notifications that need immediate attention


## 📢 aria-live

`aria-live` tells the screen reader:

"Watch this region for changes and announce new content."

Accepted values:

aria-live="off"
    → Don't announce changes automatically.

aria-live="polite"
    → Announce when the screen reader is idle.
    → Doesn't interrupt the current announcement.

aria-live="assertive"
    → Announce immediately.
    → Can interrupt the current announcement.


## role="alert" vs aria-live

`role="alert"` already has assertive live-region semantics.

Therefore for a simple Toast:

<div role="alert">
  Payment successful
</div>

is generally enough.

If using aria-live explicitly:

<div aria-live="polite">
  Payment successful
</div>

Use `polite` when the notification is useful but NOT urgent.

Use `assertive` only when the user needs to know immediately.

Don't blindly add:

role="alert"
+
aria-live="assertive"

just because both are available.


## 🔘 Close Button Accessibility

Native `<button>` is already keyboard accessible.

But "X" alone may not communicate its purpose well to a screen reader.

Use:

<button
  type="button"
  aria-label="Close notification"
>
  X
</button>

Screen reader hears:

"Close notification"

instead of just:

"X"


## 🧠 Interview Rule

Ask:

"Does this content need to be announced to a
screen-reader user?"

If YES
    ↓
Live region semantics

For Toast:
    role="alert"
    OR
    aria-live="polite/assertive"

For urgent notification:
    → alert / assertive

For non-urgent notification:
    → polite


## ⚠️ Accessibility Mistakes

❌ Making Toast a <dialog>
   → Toast is not a modal.

❌ Using only color to communicate type
   → "red = error" isn't enough for everyone.

❌ Close button only understandable visually
   → Give it an accessible name.

❌ Making every notification assertive
   → Can aggressively interrupt screen readers.


## 🔑 React Key

❌ key={idx}

✅ key={item.toastID}

Use identity, not array position.


## ⚠️ Interview Edge Cases

- Multiple toasts must coexist.
- Same message can appear multiple times.
- Remove by ID, not message/position.
- Manual close + auto-close should not break.
- Clean up timers when necessary.
- Long messages shouldn't break layout.
- Each position should maintain its own stack.
- Screen readers should be able to discover important notifications.


## 💡 Biggest Learning From This Session

1. Synthetic event is passed automatically to onClick.
2. Toast ID must be explicitly passed to removeToast().
3. State can be stale inside a closure/render snapshot.
4. If state update depends on previous state → use prev.
5. setTimeout callback captures variables from its surrounding scope.
6. Toast ID and timer handle are conceptually different things.
7. Toast is a notification, NOT a modal/dialog.
8. Accessibility means making the notification available to
   users who rely on assistive technology.


## 🔒 FINAL MENTAL MODEL

Toast System =
    notification[]
    +
    showToast()
    +
    removeToast(id)
    +
    lifecycle timer
    +
    Toast rendering
    +
    positioning
    +
    accessibility


## 🔥 One-Line Rules

"What's the latest state?"
        → prev

"Which toast?"
        → toastID

"Should it disappear later?"
        → setTimeout → removeToast(id)

"Should screen readers know?"
        → role="alert" / aria-live

"Is it a modal?"
        → NO, it's a Toast