# UI-005 — Make primary workflows keyboard-first and commands discoverable

**Status:** Accepted  
**Category:** Interface design

## Rule

Every primary workflow in a user-facing application must be completable with the keyboard. Application shortcuts must be backed by a central command registry and exposed through a discoverable command palette unless a repository-specific convention records an explicit opt-out.

Every command needs a stable identifier, localized label, availability rule, execution handler, and optional platform-aware shortcut. A shortcut accelerates an existing command; it must not be the only way to discover or invoke essential behavior.

## Rationale

Scattered key listeners create conflicts, fire inside text fields, ignore platform conventions, and hide functionality from users. A command model connects menus, buttons, palettes, help surfaces, accessibility, analytics, and shortcuts to one source of truth.

## Agent behavior

1. Model an action as a command before attaching a global shortcut.
2. Reuse the command from buttons, menus, context actions, and the command palette rather than duplicating handlers.
3. Prefer platform conventions and display `Ctrl` or `Cmd` according to the active platform.
4. Do not override browser, operating-system, or assistive-technology shortcuts without a documented product requirement.
5. Do not bind unmodified printable characters globally. Ignore application shortcuts in inputs, textareas, content-editable regions, and composition sessions unless the command is explicitly scoped to that editor.
6. Define context and priority for overlapping shortcuts and make conflicts fail deterministically.
7. Preserve visible focus, logical tab order, standard control semantics, and expected Enter, Space, Escape, and arrow-key behavior.
8. Show shortcuts beside commands and provide searchable localized command names. Touch users must have an on-screen equivalent for every required action.

## Completion evidence

Keyboard-only tests for changed critical flows are blocking. They must begin from a realistic entry point, avoid mouse or coordinate input, and assert focus movement and observable outcomes.

Hotkey conflict and editable-field tests are also blocking. They must prove that registered combinations are unique in overlapping contexts, disabled commands do not execute, and typing or composing text does not trigger unrelated global actions.

## Example

`open-command-palette` is a registered command invoked by a header button and a platform-aware shortcut. The same registry supplies its localized name and shortcut hint. Pressing the shortcut in a normal page opens the palette; pressing it while an editor claims that combination follows the declared scope and priority instead of running both handlers.

## Automatable check

The command registry can validate duplicate IDs, conflicting shortcut/context pairs, missing labels, and commands without a non-shortcut invocation path. Playwright can exercise keyboard-only critical journeys.

## Exceptions and trade-offs

A content-only site with no application actions may omit the command palette through an explicit repository decision. Canvas, game, terminal, media, and editor surfaces may intentionally capture additional keys, but must scope capture to the focused surface, document the bindings, provide an exit path, and retain accessible alternatives for required actions.

## Consequences

Power-user behavior becomes consistent and testable without sacrificing ordinary navigation, text input, touch access, or assistive technology.
