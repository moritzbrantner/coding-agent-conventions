# REACT-003 — Put important navigational state in URL query parameters

**Status:** Accepted

Important view state that should survive reload, sharing, bookmarking, or backward and forward navigation should be represented with URL query parameters. Typical examples are filters, search, sorting, pagination, and meaningful selections. Ephemeral UI details and sensitive values do not belong in the URL.
