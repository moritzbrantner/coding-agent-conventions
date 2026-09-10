# Validated runtime representation reuse rollout

This rollout tracks the application of `PRINCIPLE-008`: compute or parse a semantic representation once, validate it at the owning boundary, and reuse that trusted representation downstream until its deterministic inputs change.

## Scope

This is runtime/dataflow reuse, not CI build-artifact reuse. It applies to repeated parsing, probing, normalization, feature extraction, lookup/index construction, geometry preparation, and similar work where multiple downstream consumers need the same already-proven facts.

Do not remove deliberately independent verification. A second computation remains appropriate when it proves a distinct contract, uses materially different inputs, or belongs to another semantic owner.

## First inspection wave

- `audio-analysis` — strongest concrete duplicate boundary: explicit FFmpeg audio-stream selection currently probes the same input once for stream validation and again for selected-stream metadata. First repair target.
- `video-to-3d` — already demonstrates the desired pattern for revisit recovery by retaining vetted match evidence and reusing it for PnP recovery instead of rematching.
- `nlp-stack` — inspect persisted corpus/retrieval/model inputs for repeated parse/normalize/validation and reuse only owner-produced typed snapshots/indexes.
- `maps` — inspect decoded/validated geographic inputs and prepared spatial/render structures for repeated normalization or index construction; keep renderer-specific preparation distinct from semantic map ownership.
- `dirbase` — existing positive reference: parsed resources are cached with invalidation and shared through `Arc<Value>`; per-request embed lookup structures are built once and reused.

## Extraction rule

Keep each trusted representation with its semantic owner. Extract a shared type or package only after at least two real consumers require the same meaning, validation contract, and invalidation lifecycle.
