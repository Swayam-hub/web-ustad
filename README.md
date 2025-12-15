## App Navigation & Routing Logic

This document explains how application navigation and route rewriting works based on:

- Subdomain presence
- User authentication state
- Requested pathname
- Query / search parameters

---

### 1. Subdomain Handling

**Rule**

- If a subdomain exists in the incoming request:
  - Rewrite the request to:

    ```
    /domain/{pathId}
    ```

  - Preserve all query/search parameters.

**Purpose**

- Enables tenant-based or domain-based routing.
- Ensures deep links continue to work correctly.

---

### 2. No Subdomain Present

If no subdomain is detected, the system applies authentication-based routing.

---

### 3. Authentication Check

#### 3.1 User is Logged In

- Rewrite the request to:

/agency/sign-in

yaml
Copy code

**Reason**

- Routes authenticated users into the agency flow.

---

#### 3.2 User is NOT Logged In

Further routing is determined by the requested pathname.

---

### 4. Path-Based Routing (Unauthenticated Users)

#### 4.1 Public Website Access

**Condition**

- Pathname is:
- `/`
- `/site`

**Action**

- Rewrite to:

/site

markdown
Copy code

**Reason**

- User intends to access the public website.
- Provides a consistent public entry point.

---

#### 4.2 Dashboard / Protected Routes

**Condition**

- Pathname is NOT `/` or `/site`
- Indicates access to dashboard or protected content

**Action**

- Rewrite to:

{originalPath}

pgsql
Copy code

- Preserve all query/search parameters.

**Reason**

- Allows downstream authentication guards to handle protection.
- Maintains deep-link and URL integrity.

---

### 5. Routing Flow Summary

```text
Incoming Request
│
├─ Subdomain exists?
│   ├─ Yes → Rewrite to /domain/{pathId} + query params
│   └─ No
│
├─ Is user logged in?
│   ├─ Yes → Rewrite to /agency/sign-in
│   └─ No
│
├─ Path is "/" or "/site"?
│   ├─ Yes → Rewrite to /site
│   └─ No → Rewrite to original path + query params

## App Navigation Architecture

```mermaid
flowchart TD
    A[Incoming Request] --> B{Subdomain Exists?}

    B -->|Yes| C[Rewrite to /domain/{pathId}\n+ Preserve Query Params]

    B -->|No| D{User Logged In?}

    D -->|Yes| E[Rewrite to /agency/sign-in]

    D -->|No| F{Pathname is "/" or "/site"?}

    F -->|Yes| G[Rewrite to /site]

    F -->|No| H[Rewrite to Original Path\n+ Preserve Query Params]

    C --> I[Next.js Route Handler]
    E --> I
    G --> I
    H --> I
