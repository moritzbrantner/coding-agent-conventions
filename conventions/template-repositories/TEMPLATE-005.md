# TEMPLATE-005 — Only propagate intentional decisions

**Status:** Accepted  
**Category:** Template repositories

## Rule

Treat everything included in a template as an endorsed default for downstream projects. Do not add dependencies, abstractions, folders, helpers, or example modules merely because they may be useful later.

## Rationale

Template boilerplate has a multiplicative cost. Once copied, humans and agents must determine whether each artifact is intentional architecture or removable sample code. A smaller intentional baseline makes presence itself meaningful.

## Agent behavior

Before adding something to a template, ask whether most projects created from that template should inherit it. If not, prefer an optional recipe or later addition.

A small example may remain when it proves an architectural integration or demonstrates an otherwise invisible convention.