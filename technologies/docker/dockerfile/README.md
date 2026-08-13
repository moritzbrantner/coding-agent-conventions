# Dockerfile conventions

Dockerfile conventions specialize the parent Docker scope.

Rules in this directory use the `DOCKERFILE-*` prefix and cover Dockerfile authoring: base images, build stages, layer construction, build context, dependency installation, runtime users, copied artifacts, image size, caching, entrypoints, and build-time versus runtime configuration.

Applicable scope:

```text
technologies/docker/dockerfile/
        -> technologies/docker/
        -> general conventions
        -> principles
```

Docker Compose topology remains governed by `ENV-002`; `.env` / `.env.example` behavior remains governed by `ENV-003`.
