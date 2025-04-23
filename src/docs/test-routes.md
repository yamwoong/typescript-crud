# Test Routes

This document lists the test routes used during development. These routes are intended for debugging and should not be included in production.

---

## 📌 Test Route List

| Purpose                 | URL                      | Description                                                                           |
|-------------------------|--------------------------|---------------------------------------------------------------------------------------|
| AppError Test           | `/test/app-error`        | Simulates throwing an AppError to verify custom error handling.                       |
| Unexpected Error Test   | `/test/unexpected-error` | Throws a generic error to check if 500 Internal Server Error is handled correctly.    |
| asyncHandler Error Test | `/test/async-error`      | Tests if errors thrown in async functions are passed to the error handler middleware. |
| 404 Not Found Test      | `/test/does-not-exist`   | Accesses a non-existing route to confirm 404 handling.                                |

---

## ⚠️ Notes

- Make sure to remove or disable these routes in production.
- You may restrict access to these routes to admin/developer users only.
- Keeping them isolated improves security and maintainability.
