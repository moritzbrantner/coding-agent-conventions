# Validated runtime representation reuse rollout

This rollout tracks the application of `PRINCIPLE-008`: compute or parse a semantic representation once, validate it at the owning boundary, and reuse that trusted representation downstream until its deterministic inputs change.

## Scope

This is runtime/dataflow reuse, not CI build-artifact reuse. It applies to repeated parsing, probing, normalization, feature extraction, lookup/index construction, geometry preparation, and similar work where multiple downstream consumers need the same already-proven facts.

Do not remove deliberately independent verification. A second computation remains appropriate when it proves a distinct contract, uses materially different inputs, or belongs to another semantic owner.

## First inspection wave

- `audio-analysis` — **actionable**. Explicit FFmpeg audio-stream selection currently probes the same input once for stream-inventory validation and immediately again for selected-stream metadata. The repair should retain one richer private probe snapshot, validate the requested stream against it, and derive selected metadata from that same snapshot. Keep the snapshot private to `audio-analysis-io`; there is no second consumer justifying a shared package/type.
- `video-to-3d` — **adopted** for revisit recovery. Vetted non-adjacent mutual-match evidence is retained and reused by failed-registration recovery, which then feeds the existing PnP/geometry authority instead of rematching or creating a second pose authority.
- `nlp-stack` — **no immediate duplicate boundary found in the first storage/corpus pass**. `TextCorpusSnapshot` is validated when reconstructing the typed corpus, and persisted retrieval data is loaded into one typed `PersistedSearchIndex` before conversion into `RetrievalIndex`. Do not invent a cache or wrapper here without call-site or profiling evidence of repeated equivalent work; continue inspection around model-backed semantic-map pipelines as those stabilize.
- `maps` — **adopted** for point aggregation. `PointAggregationIndex::new` validates options, normalizes source points, builds the spatial hierarchy, metric-key set, and stable point lookup once; viewport and cluster queries reuse that owned index and its metric cache. Renderer-specific preparation remains a distinct downstream concern.
- `dirbase` — **mature positive reference**. Parsed resources are cached with explicit file-metadata invalidation and shared through `Arc<Value>`; per-request embed target data and lookup structures are loaded/built once and reused across rows.

## Extraction rule

Keep each trusted representation with its semantic owner. Extract a shared type or package only after at least two real consumers require the same meaning, validation contract, and invalidation lifecycle.

## Next repair

Implement the `audio-analysis-io` FFprobe snapshot repair first. After it is accepted, use runtime-profiler/call-site evidence to choose the next migration rather than sweeping repositories mechanically.
