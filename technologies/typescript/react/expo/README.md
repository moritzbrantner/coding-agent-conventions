# Expo conventions

## EXPO-001 — Bind performance evidence to representative Expo runtimes

- Identify the device, operating system, Expo/React Native runtime, build artifact or profile, and representative interaction journey for performance evidence.
- Keep startup, frame stalls, JavaScript-thread work, native-thread work, memory, and interaction latency as distinct metrics rather than one synthetic score.
- Treat Expo Go or development-server timing as development evidence; do not present it as production-build performance unless the measured artifact and runtime are equivalent.
