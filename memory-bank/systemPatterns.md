# System Patterns

## Architectural Patterns

- Pattern 1: Description

## Design Patterns

- Pattern 1: Description

## Common Idioms

- Idiom 1: Description

## OLED-Optimized Modular UI with Web-Aligned Asset Strategy

Centralized color tokens in constants/app-colors.ts using a Slate/Emerald palette optimized for OLED (Deep Emerald). Components consume these tokens for consistent theming. Typography uses Montserrat font family. Asset management uses a SmartImage component for dynamic quality adjustment and a CSS-constructed Logo component for brand consistency. Mock API layer in lib/api.ts allows for frontend development independent of backend availability.

### Examples

- constants/app-colors.ts for theme tokens
- components/ui/SmartImage.tsx for dynamic assets
- components/ui/Logo.tsx for brand identity
- lib/api.ts for mock data and endpoints


## AI-Education Specialized Components

Specialized 2026 UI patterns for high-stakes education: Skia-based analytics, Markdown-rendered AI tutoring, and FlashList-powered exam banks.
