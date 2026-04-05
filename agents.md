# AI Agent System Instructions & Project Context (CF-UA)

> **CRITICAL INSTRUCTIONS FOR AI AGENTS:** 
> Read this document fully before generating or modifying any code. It contains strict project constraints, architectural patterns, and rules specifically designed to prevent AI hallucinations and enforce consistency.

---

## 1. Core Stack & Strict Constraints 🚫

When generating code, you **MUST** adhere to the following constraints. Deviating will break the build or the design system:

*   **NO TypeScript:** This is a **pure JavaScript** project (`.jsx` / `.js`). Do not generate `.ts` or `.tsx` files. Do not add TS interfaces.
*   **NO Tailwind CSS:** We use **Vanilla CSS** and **SASS**. Do not add, assume, or generate Tailwind utility classes (e.g., `flex`, `pt-4`, `text-center`). 
*   **NO UI Component Libraries (Except existing Bootstrap grid):** Do not import Material UI, Ant Design, Chakra UI, Radix, etc. We build components from scratch using our CSS classes like `.modal-overlay`, `.modal-content`, etc.
*   **NO Separate Admin Panel:** This is a hybrid SPA. The admin interface exists directly on the public pages. Elements switch into edit mode dynamically based on the Redux `state.auth.isLoggedIn` flag. Do not create specific routes like `/admin/dashboard`.
*   **NO React Router for Page Sections:** The single-page layout navigates via **react-scroll** (`<ScrollLink to="section-id">`). `react-router-dom` v6 is ONLY used for deep-linking (e.g., `/news/:id`).
*   **NO Local State for Global Data:** Use Redux Toolkit for anything that spans multiple components (auth, news, portfolio, etc.).

---

## 2. Directory Structure & Placements 📁

When creating new files, strictly follow these locations:

*   `/src/main.jsx` — Entry point, Router configuration, and Redux Store provider.
*   `/src/main/` — Section wrappers for the home page layout (e.g., `NewsSection.jsx`, `TeamSection.jsx`). These should be thin presentational wrappers.
*   `/src/containers/` — Redux-connected ("Smart") components. These fetch data `onMount` and pass it down.
*   `/src/components/` — Reusable UI components. 
*   `/src/components/common/` — Shared generic components (e.g., `ConfirmationModal.jsx`, `BaseEditor.jsx`).
*   `/src/actions/` & `/src/reducers/` — Redux thunks and slice reducers.
*   `/src/utils/api.js` — The Axios singleton for authorized API requests.
*   `/src/assets/css/` & `/src/styles/` — All global and feature-scoped CSS files.

---

## 3. The "Hybrid SPA" Authentication Pattern 🔐

The core philosophy of this app is inline editing.

1.  **State Check:** Use `const isLoggedIn = useSelector(state => state.auth.isLoggedIn)` to gate administrative features.
2.  **UI Switch:** If `!isLoggedIn`, show the standard read-only view. If `isLoggedIn`, render "Edit" / "Delete" action buttons (often a three-dots menu icon) overlaid directly on the public content.
3.  **Token Storage:** The JWT access token is stored in **`sessionStorage`** ONLY (cleared on tab close).
4.  **Making Authenticated Requests:** 
    *   You **MUST** use the custom API client for backend mutations (`import api from '../utils/api'`).
    *   Do **NOT** manually attach the Bearer token; the `api.js` Axios interceptor does this automatically.
    *   You may use standard `axios` for purely public `GET` requests, but `api` is highly preferred for all internal backend calls.

---

## 4. Component & Editor Architecture 🧩

### Modals
We use a strict custom modal pattern. Never use `window.alert()` or `window.prompt()`.
```jsx
// Standard Modal Pattern
<div className="modal-overlay" onMouseDown={onClose}>
  <div className="modal-content" onMouseDown={e => e.stopPropagation()}>
    {/* Body */}
  </div>
</div>
```

### Editors (Inheritance Pattern)
To manage entities (News, Portfolio, etc.), we use the `BaseEditor` class component.
1.  **`BaseEditor.jsx`** handles core state (`formData`), `handleInputChange`, and `handleSave`.
2.  Specific editors (like **`NewsEditor.jsx`**) are **Class Components** that `extend BaseEditor` and implement the `renderFormFields()` method. Do not convert editors inheriting `BaseEditor` into functional components.
3.  **Rich Text**: We use **TipTap** wrapped in `ModernEditor.jsx` for rich text fields. It outputs standard HTML strings (`<p>`, `<strong>`, etc.). 
4.  **HTML Rendering**: When displaying raw HTML content from the backend, use React's `dangerouslySetInnerHTML={{ __html: content }}` inside a wrapper element.

### Component Props
Always declare `PropTypes` for functional and class components to catch bugs. No exceptions.

---

## 5. Development APIs & Redux Actions 🛠

*   **Proxy:** The Webpack dev server proxies `/api` to `http://localhost:3000`. Do not explicitly type `http://localhost:3000` in your Axios calls. Use relative paths: `api.get('/api/news')`.
*   **Redux Flow:**
    1.  Create an async thunk action in `/src/actions`.
    2.  Handle state transitions (`_START`, `_SUCCESS`, `_ERROR`) in the corresponding `/src/reducers`.
    3.  Connect to component via `useDispatch` and `useSelector` (Hooks preferred for functional components, `connect` for legacy classes).

### Known Endpoints
*   `GET /api/sliders`, `/api/about`, `/api/news`, `/api/teammates`, `/api/portfolio`, `/api/teamFacts` (Public)
*   `POST /api/auth/login` (Public, returns `access_token` and `user`)
*   `PUT /api/news/:id`, `DELETE /api/news/:id` (Private, Requires Bearer token)
*   `PUT /api/users/:id` (Private, Profile update)

---

## 6. CSS Guidelines 🎨
*   Prefix feature-specific CSS appropriately or use the existing rigid grids (e.g., `row`, `col-md-6`).
*   The project uses elements of Bootstrap (`col-**` classes are prevalent), but it is highly customized. Check `src/assets/css/grid12.css` and `src/assets/css/style.css`.
*   Maintain the dark background/golden accent theme naturally unless specified otherwise.
*   Do NOT overwrite `main.jsx` blindly affecting the entire routing map.
