# Docker conventions

This directory contains conventions that arise specifically from Docker images, build context, image composition, and related Docker artifacts.

Docker Compose development/test orchestration is documented separately as the general environment convention `ENV-002`. Do not duplicate that orchestration rule here.

Current child scopes:

```text
docker/
  dockerfile/   # DOCKERFILE-*
```

Rules that apply to Docker broadly may live directly here with the `DOCKER-*` prefix. Rules specifically about authoring Dockerfiles belong under `dockerfile/`.
