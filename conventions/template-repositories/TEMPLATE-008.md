# TEMPLATE-008 — Templates declare their applicable convention stack

**Status:** Accepted  
**Category:** Template repositories

## Rule

A template should declare which shared convention and technology scopes apply to projects created from it through a mechanically readable local configuration or profile reference.

Reference stable convention IDs and technology scopes instead of copying convention prose into every template.

## Rationale

A template already represents deliberate stack choices. Making them explicit lets coding agents and validation tools resolve applicable rules without repeatedly inferring them from dependencies or documentation.

## Agent behavior

When the template intentionally adds or removes a technology family or convention, update its local convention declaration in the same change. Keep repository-specific overrides local.

The exact schema may evolve with the Moonlight integration.