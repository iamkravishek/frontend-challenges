# Architecture

## Problem

Implement Infinite Scroll.

## Approach

Use IntersectionObserver to observe the last rendered item.

When visible:

- Fetch next page
- Append data
- Re-observe new last element

## Why IntersectionObserver?

Advantages:

- Better Performance
- No Continuous Scroll Events
- Browser Optimized

## Alternatives

### Scroll Event

Pros:

- Easy

Cons:

- Performance Issues

### Virtualization

Pros:

- Excellent for Large Lists

Cons:

- Additional Complexity
- Remove cmd+f feature

## Complexity

Rendering:

O(n)

Observer:

O(1)