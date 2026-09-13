# Expo conventions

## EXPO-001 — Preserve Expo runtime boundaries in performance evidence

- When Expo/React Native thread behavior is relevant, distinguish JavaScript-thread work from native-thread work rather than collapsing them into one CPU or frame-stall signal.
- Treat Expo Go or development-server timing as development evidence; do not present it as production-build performance unless the measured artifact and runtime are equivalent.
