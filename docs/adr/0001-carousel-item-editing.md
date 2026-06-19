# ADR 0001: Carousel Item Inline Editing

**Status:** Proposed  
**Date:** 2026-06-19

## Context

Carousel (slider) items are fetched via `GET /api/sliders` and rendered by `SliderItem`. Each item has: `img`, `title1`, `title2`, `subTitle`, `text`. Currently there is no UI to edit them — changes require direct DB access.

The team management feature established a pattern: three-dots menu → modal editor extending `BaseEditor` → `PUT /api/<resource>/:id` → Redux action updates state in place.

## Decision

Apply the same pattern to carousel items:

1. **`SliderEditor`** — extends `BaseEditor` with fields for `title1`, `title2`, `subTitle`, `text`, `img` (URL input).
2. **`SliderItem`** — when admin is logged in, show three-dots menu triggering `SliderEditor` modal.
3. **`sliderActions`** — add `updateSlider(id, data)` dispatching `UPDATE_SLIDER_SUCCESS`.
4. **`sliderReducer`** — handle `UPDATE_SLIDER_SUCCESS` by mapping over `slidersInfo` and replacing the matching item.
5. **`api.js`** — reuse the existing axios instance (auth header + expiry check already wired).

## Consequences

- Consistent with team member editing — no new patterns introduced.
- `PUT /api/sliders/:id` must exist on the backend (NestJS controller + guard).
- `BaseEditor` endpoint prop will be `"/api/sliders"`.
