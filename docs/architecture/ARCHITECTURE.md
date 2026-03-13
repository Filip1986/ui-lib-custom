# UI Components Library - Architecture & Workflow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              YOUR ANGULAR WORKSPACE                             │
│              (D:\Work\Personal\Github\ui-lib-custom)          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │         DEVELOPMENT WORKSPACE                │
        └─────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
    ┌─────────────────────┐    ┌─────────────────────┐
    │   LIBRARY SOURCE    │    │   DEMO APP          │
    │  (ui-components)    │    │   (demo)            │
    ├─────────────────────┤    ├─────────────────────┤
    │ • Button Component  │    │ • Showcases all     │
    │   - Material        │    │   components        │
    │   - Bootstrap       │    │ • Interactive demos │
    │   - Minimal         │    │ • Running at        │
    │                     │    │   localhost:4200    │
    │ • Card Component    │    └─────────────────────┘
    │   - Material        │
    │   - Bootstrap       │
    │   - Minimal         │
    │                     │
    │ • Public API        │
    │ • TypeScript Types  │
    └─────────────────────┘
                │
                │ ng build ui-lib-custom
                ▼
    ┌─────────────────────┐
    │   BUILT LIBRARY     │
    │ (dist/ui-lib-custom)│
    ├─────────────────────┤
    │ • ES Modules        │
    │ • Type Definitions  │
    │ • Styles            │
    │ • package.json      │
    └─────────────────────┘
                │
                │ Distribution Methods
                ▼
    ┌───────────────────────────────────────┐
    │                                       │
    ▼                   ▼                   ▼
┌─────────┐     ┌──────────┐      ┌──────────┐
│npm link │     │npm publish│     │Local Path│
└─────────┘     └──────────┘      └──────────┘
    │                │                  │
    └────────────────┴──────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │    YOUR ANGULAR PROJECTS           │
    │                                    │
    │  import { Button, Card }           │
    │  from 'ui-lib-custom';             │
    │                                    │
    │  <ui-lib-button>                    │
    │  <ui-lib-card>                      │
    └────────────────────────────────────┘
```

## Component Structure

```
Button Component                    Card Component
├── button.ts (Logic)              ├── card.ts (Logic)
├── button.html (Template)         ├── card.html (Template)
├── button.css (Styles)            └── card.css (Styles)
└── button.spec.ts (Tests)
    │
    ├── Inputs:                        Inputs:
    │   • variant                      • variant
    │   • size                         • elevation
    │   • color                        • bordered
    │   • disabled                     • hoverable
    │   • fullWidth
    │
    └── Content Projection         Content Projection:
        • <ng-content>                 • [card-header]
                                      • <ng-content> (body)
                                      • [card-footer]
```

## Workflow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                       │
└──────────────────────────────────────────────────────────────┘

1. CREATE/EDIT COMPONENTS
   │
   ▼
   projects/ui-lib-custom/src/lib/
   ├── button/
   │   ├── button.ts
   │   ├── button.html
   │   └── button.css
   └── card/
       ├── card.ts
       ├── card.html
       └── card.css

2. EXPORT IN PUBLIC API
   │
   ▼
   projects/ui-lib-custom/src/public-api.ts
   export * from './lib/button/button';
   export * from './lib/card/card';

3. BUILD LIBRARY
   │
   ▼
   ng build ui-lib-custom [--watch]
   │
   ▼
   dist/ui-lib-custom/
   ├── esm2022/
   ├── fesm2022/
   ├── index.d.ts
   └── package.json

4. TEST IN DEMO
   │
   ▼
   ng serve demo → http://localhost:4200

5. DISTRIBUTE
   │
   ├─→ npm link → Local Development
   ├─→ npm publish → Public Registry
   └─→ file: path → Direct Reference

6. USE IN PROJECTS
   │
   ▼
   Your Angular Project:
   import { Button, Card } from 'ui-lib-custom';
   <ui-lib-button variant="material">Click</ui-lib-button>
```

## Variant System

```
┌──────────────────────────────────────────────────────────┐
│                    DESIGN VARIANTS                        │
└──────────────────────────────────────────────────────────┘

Material Design              Bootstrap                Minimal
┌──────────────┐         ┌──────────────┐        ┌──────────────┐
│  ┌────────┐  │         │  ┌────────┐  │        │  ┌────────┐  │
│  │ Button │  │         │  │ Button │  │        │  │ Button │  │
│  └────────┘  │         │  └────────┘  │        │  └────────┘  │
│   Elevated   │         │   Bordered   │        │  Borderline  │
│   Shadow     │         │   Gradient   │        │  Clean       │
│   Ripple     │         │   Classic    │        │  Simple      │
└──────────────┘         └──────────────┘        └──────────────┘

Features:                Features:               Features:
• Box Shadow            • Border: 1px           • Border only
• Transform            • Subtle gradient       • No shadow
• Text transform       • Traditional           • Transparent bg
• Elevation            • Business style        • Content focus

Use Cases:              Use Cases:              Use Cases:
• Modern apps          • Admin panels          • Blogs
• Dashboards           • Enterprise            • Docs
• SaaS products        • Business apps         • Minimal UIs
```

### Global variant default
`ThemeConfigService` exposes a global `variant` signal (`material | bootstrap | minimal`) that components use as a default when no per-instance `variant` input is provided. This allows live switching across the entire app while keeping per-component overrides intact.

```ts
const themeService = inject(ThemeConfigService);
themeService.setVariant('bootstrap');
```

Components compute:
```
const effectiveVariant = computed(() => this.variant() ?? themeService.variant());
```

## Component Properties

```
┌────────────────────────────────────────────────────────────┐
│                    BUTTON COMPONENT                         │
└────────────────────────────────────────────────────────────┘

@Input() variant: 'material' | 'bootstrap' | 'minimal'
@Input() size: 'small' | 'medium' | 'large'
@Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
@Input() disabled: boolean
@Input() fullWidth: boolean

CSS Classes Applied:
.btn
.btn-{variant}
.btn-{size}
.btn-{color}
.btn-full-width (if fullWidth)
.btn-disabled (if disabled)

┌────────────────────────────────────────────────────────────┐
│                     CARD COMPONENT                          │
└────────────────────────────────────────────────────────────┘

@Input() variant: 'material' | 'bootstrap' | 'minimal'
@Input() elevation: 'none' | 'low' | 'medium' | 'high'
@Input() bordered: boolean
@Input() hoverable: boolean

Content Slots:
<div card-header>...</div>     → Header section
<ng-content>...</ng-content>   → Main body
<div card-footer>...</div>     → Footer section

CSS Classes Applied:
.ui-lib-card
.ui-lib-card--{variant}
.ui-lib-card--elevation-{elevation}
.ui-lib-card--bordered (if bordered)
.ui-lib-card--hoverable (if hoverable)
.ui-lib-card__header / __body / __footer
```

## Usage Flow

```
┌──────────────────────────────────────────────────────────────┐
│              HOW COMPONENTS REACH YOUR PROJECT               │
└──────────────────────────────────────────────────────────────┘

1. DEVELOPMENT
   ┌─────────────┐
   │ Edit .ts/.  │
   │ html/.css   │
   └─────────────┘
         ↓
2. BUILD
   ┌─────────────┐
   │ng build      │
   │ui-components│
   └─────────────┘
         ↓
3. PACKAGE
   ┌─────────────┐
   │dist/ui-     │
   │components   │
   └─────────────┘
         ↓
4. LINK/INSTALL
   ┌─────────────┐
   │npm link or  │
   │npm install  │
   └─────────────┘
         ↓
5. IMPORT
   ┌─────────────┐
   │import {...} │
   │from 'ui-...'│
   └─────────────┘
         ↓
6. USE
   ┌─────────────┐
   │<ui-lib-      │
   │button>      │
   └─────────────┘
```

## File Dependencies

```
app.ts (Your Component)
    │
    ├─ import { Button, Card } from 'ui-lib-custom'
    │                               │
    │                               ▼
    │                    dist/ui-lib-custom/index.d.ts
    │                               │
    │                               ├─→ button.d.ts
    │                               └─→ card.d.ts
    │
    ├─ imports: [Button, Card]
```
    └─ template: `
         <ui-lib-button>    ──────→  button.html
         <ui-lib-card>      ──────→  card.html
       `
                                        │
                                        ├─→ button.css
                                        └─→ card.css
```

## Project Timeline

```
✅ COMPLETED
├─ [√] Angular workspace created
├─ [√] Library structure generated
├─ [√] Button component implemented
│   ├─ [√] Material variant
│   ├─ [√] Bootstrap variant
│   └─ [√] Minimal variant
├─ [√] Card component implemented
│   ├─ [√] Material variant
│   ├─ [√] Bootstrap variant
│   └─ [√] Minimal variant
├─ [√] Library built successfully
├─ [√] Demo application created
├─ [√] Demo running (localhost:4200)
├─ [√] Public API exported
├─ [√] TypeScript types defined
├─ [√] Comprehensive documentation
└─ [√] Ready for consumption

🎯 READY FOR USE
└─ Can be used in any Angular project right now!

📝 FUTURE ENHANCEMENTS (Optional)
├─ [ ] Add more components (Input, Select, Modal, etc.)
├─ [ ] Add unit tests
├─ [ ] Add Storybook
├─ [ ] Publish to npm
├─ [ ] Setup CI/CD
├─ [ ] Add dark mode
├─ [ ] Add accessibility features
└─ [ ] Create documentation website
```

---

## Quick Command Reference

```bash
# View Demo
http://localhost:4200

# Rebuild Library
cd D:\Work\Personal\Github\ui-lib-custom
ng build ui-lib-custom

# Watch Mode
ng build ui-lib-custom --watch

# Link Library (one-time)
cd dist/ui-lib-custom
npm link

# Use in Project
cd /path/to/project
npm link ui-lib-custom

# Import in Code
import { Button, Card } from 'ui-lib-custom';
```

---

**Status: ✅ COMPLETE AND OPERATIONAL**
**Demo: 🟢 Running at http://localhost:4200**
**Library: 📦 Built and ready in dist/ui-lib-custom/**
**Ready to use: ✨ YES!**
