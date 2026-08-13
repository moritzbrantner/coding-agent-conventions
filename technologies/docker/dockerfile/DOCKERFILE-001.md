# DOCKERFILE-001 — Keep runtime images minimal and reproducible

**Status:** Accepted

Prefer multi-stage builds when build requirements differ from runtime requirements. The final image should contain only what the application needs to run plus intentionally included runtime assets. Development images may intentionally contain additional tooling.
