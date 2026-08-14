# Component and page-pattern selection

Choose by semantic job and information shape before reaching for `Card`.

## Page composition

| Need | Prefer |
|---|---|
| Application chrome | `Navbar`, `PageShell`, `PageContent` |
| Page identity, actions, breadcrumbs, tabs | `ViewHeader` or the shell's `PageHeader` |
| Dense editor or operator workspace | `WorkbenchLayout`, `WorkbenchToolbar`, `WorkbenchPanel`, `WorkbenchCanvas` |
| Truly independent bounded object | `Card` |
| Visual grouping without an independent object | spacing, section heading, `Separator`, or one shared surface |

## Information display

| Information shape | Prefer |
|---|---|
| Label/value facts | `DescriptionList` |
| Repeated compact objects | `ItemGroup`, `Item`, `ItemSeparator` |
| Searchable/filterable collection | `FilterBar`, `SearchField`, `ResourceList` |
| Comparable records | `DataGrid` |
| Selected-row actions | `SelectionToolbar` |
| Contextual comparable measures | one `MetricStrip` with delta, target, or description |
| A count already represented by visible rows | inline count near the heading, tab, or filter; often no separate component |

## Forms and states

| Need | Prefer |
|---|---|
| Structured form | `FormSection`, `Field`, `FormActions` |
| Validation feedback | `FieldError`, `ValidationSummary` |
| Loading, empty, error, or offline | `LoadingState`, `EmptyState`, `ErrorState`, `OfflineState` |
| Destructive confirmation | `ConfirmAction` or `AlertDialog` |

## Actions

| Need | Prefer |
|---|---|
| Desktop row commands | `ActionMenu` |
| Contextual target commands | `ContextActionMenu` |
| Touch-first commands | `ActionSheet` |
| Responsive desktop/mobile overflow | `ResponsiveActionMenu` |
| Read-only preview | `HoverPreview`; never hide required actions only on hover |

The app owns data fetching, URL state, permissions, mutations, analytics, route changes, and product-specific copy.

## Theme selection

| Surface | Theme |
|---|---|
| Ordinary platform application | default / Bobba |
| Polished glass application shell | Zleek |
| Dense dashboard or analytics | Atlas |
| Creative production and editing | Studio |
| Document or research-heavy interface | Paper |
| Scholarly archive or reference workbench | Scholia |
| Public Studio-adjacent creator surface | Pop |
| Kinetic open/close/expand/select choreography | Pulse |
