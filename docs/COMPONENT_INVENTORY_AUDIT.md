# Component Inventory Audit

> **Purpose:** Gap analysis across the Angular and modern UI ecosystem to ensure this library
> has at least everything the best competing libraries offer, and documents every conscious
> exclusion with a reason.
>
> **Last researched:** 2026-05-13
> **Re-audit trigger:** When a major library ships a significant new component, or before each
> public release phase.

---

## Libraries Audited

| Library              | Components | Why included                                                   |
| -------------------- | ---------- | -------------------------------------------------------------- |
| **Angular Material** | ~35        | Google's official Angular library — canonical baseline         |
| **PrimeNG**          | ~90        | Most feature-complete Angular library in active use            |
| **Ng-Zorro**         | ~75        | Ant Design for Angular — strong enterprise component set       |
| **Ng-Bootstrap**     | ~20        | Bootstrap for Angular — broadly used, especially in enterprise |
| **shadcn/ui**        | ~71        | React, best DX reference — what developers now expect          |
| **Radix UI**         | ~30        | React, a11y gold standard — headless primitives                |

---

## Current Library Inventory (92 components / directives)

<details>
<summary>Expand full list</summary>

**Core Inputs:** Button, IconButton, Input, Textarea, Select, AutoComplete, CascadeSelect,
Checkbox, RadioButton, ToggleButton, ToggleSwitch, SelectButton, InputNumber, InputMask,
InputOtp, Rating, Knob, KeyFilter, ColorPicker, Password, Slider, DatePicker, Listbox

**Layout:** Stack, Inline, Grid, Container, Fluid, Divider, Toolbar, Fieldset, Panel, ScrollPanel

**Overlay & Modal:** Dialog, DynamicDialog, Drawer, BottomSheet, Popover, Tooltip,
ConfirmDialog, ConfirmPopup

**Navigation & Menus:** Breadcrumb, ContextMenu, Dock, Menu, MegaMenu, Menubar, PanelMenu,
TieredMenu, Stepper, Tabs, Accordion

**Data Display:** Table, TreeTable, Tree, TreeSelect, DataView, VirtualScroller, Timeline,
OrderList, OrganizationChart, PickList, Paginator, Carousel, Galleria, Chart

**Feedback & Status:** Alert, Badge, Tag, Chip, Message, Skeleton, ProgressBar,
ProgressSpinner, MeterGroup, Toast (via Message/Alert live region pattern)

**Utilities & Directives:** Ripple, ScrollTop, StyleClass, FocusTrap, AnimateOnScroll,
AutoFocus, Bind, BlockUI, ClassNames, Inplace, Image, ImageCompare, Avatar, Upload,
SplitButton, Terminal, SpeedDial

</details>

---

## Gap Analysis Table

**Legend:**

- ✅ Library has it
- ⚠️ Library has a partial or limited version
- ❌ Library does not have it
- — Not applicable (e.g. React-only concept)

| Component                                    | Angular Material | PrimeNG | Ng-Zorro | Ng-Bootstrap | shadcn | Radix | **This Library** | **Decision**                                                                                             |
| -------------------------------------------- | ---------------- | ------- | -------- | ------------ | ------ | ----- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| **CONFIRMED GAPS — not yet in this library** |                  |         |          |              |        |       |                  |                                                                                                          |
| Empty State                                  | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ✅ **Add**                                                                                               |
| TimePicker                                   | ❌               | ✅      | ✅       | ✅           | ❌     | ❌    | ❌               | ✅ **Add**                                                                                               |
| DateRangePicker                              | ✅               | ✅      | ✅       | ✅           | ✅     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Splitter / Resizable Panels                  | ❌               | ✅      | ✅       | ❌           | ✅     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Statistic / Number Display                   | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Typography (Heading / Text / Code / Link)    | ❌               | ❌      | ✅       | ❌           | ✅     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Descriptions / Definition List               | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Scroll Area (custom scrollbar)               | ❌               | ❌      | ❌       | ❌           | ✅     | ✅    | ❌               | ✅ **Add**                                                                                               |
| Kbd / Keyboard Shortcut Badge                | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Segmented Control                            | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Navigation Menu (top-level with panels)      | ❌               | ❌      | ❌       | ❌           | ✅     | ✅    | ❌               | ✅ **Add**                                                                                               |
| Calendar (full month/year view)              | ❌               | ✅      | ✅       | ✅           | ✅     | ❌    | ❌               | ✅ **Add**                                                                                               |
| Result / Status Page                         | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ⏳ **Horizon**                                                                                           |
| Hover Card                                   | ❌               | ❌      | ❌       | ❌           | ✅     | ✅    | ❌               | ⏳ **Horizon**                                                                                           |
| Collapsible (simple show/hide)               | ❌               | ❌      | ❌       | ✅           | ✅     | ✅    | ❌               | ⏳ **Horizon**                                                                                           |
| Anchor / TOC Navigation                      | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | ❌               | ⏳ **Horizon**                                                                                           |
| Command Palette                              | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | ❌               | ⏳ **Horizon** (already in VISION.md)                                                                    |
| **THIS LIBRARY GOES BEYOND**                 |                  |         |          |              |        |       |                  |                                                                                                          |
| BottomSheet                                  | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| ImageCompare                                 | ❌               | ❌      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| Terminal                                     | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| MeterGroup                                   | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| OrganizationChart                            | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| Dock                                         | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| KeyFilter                                    | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| InputMask                                    | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| Knob                                         | ❌               | ✅      | ❌       | ❌           | ❌     | ❌    | ✅               | 🚀 Differentiator                                                                                        |
| **CONSCIOUSLY EXCLUDED**                     |                  |         |          |              |        |       |                  |                                                                                                          |
| QR Code                                      | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: single-purpose utility; a dedicated `qrcode` npm package is the right tool                   |
| Watermark                                    | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: canvas overlay concern; out of scope for a UI component library                              |
| Float Button / FAB                           | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: fading UI pattern; SpeedDial covers the use case                                             |
| Bottom Navigation Bar                        | ✅               | ❌      | ❌       | ❌           | ❌     | ❌    | —                | — Excluded: app shell / layout concern, not a component; developers build this with layout primitives    |
| Affix / Sticky Directive                     | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: `position: sticky` handles this natively; a directive wrapper adds no value                  |
| Scrollspy                                    | ❌               | ❌      | ❌       | ✅           | ❌     | ❌    | —                | — Excluded: IntersectionObserver in a directive; trivial to implement per-app; too opinionated           |
| Direction (RTL)                              | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | —                | — Excluded: Angular handles directionality natively via `dir` attribute and `Directionality` CDK service |
| Offcanvas                                    | ❌               | ❌      | ❌       | ✅           | ❌     | ❌    | —                | — Excluded: same as Drawer; duplicate concept                                                            |
| Sheet                                        | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | —                | — Excluded: same as Drawer                                                                               |
| Typeahead                                    | ❌               | ❌      | ❌       | ✅           | ❌     | ❌    | —                | — Excluded: same as AutoComplete                                                                         |
| Mention / @-mention Input                    | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: social/messaging app-specific; too opinionated for a general component library               |
| Comment / Thread Display                     | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: too app-domain-specific                                                                      |
| Page Header                                  | ❌               | ❌      | ✅       | ❌           | ❌     | ❌    | —                | — Excluded: app layout concern; developers compose this from Breadcrumb + Toolbar + Typography           |
| Native Select wrapper                        | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | —                | — Excluded: use the native `<select>` element                                                            |
| Spinner (standalone)                         | ❌               | ❌      | ✅       | ❌           | ✅     | ❌    | —                | — Excluded: ProgressSpinner covers this                                                                  |
| Sonner / Toast variant                       | ❌               | ❌      | ❌       | ❌           | ✅     | ❌    | —                | — Excluded: animation style preference, not a separate component                                         |
| Aspect Ratio                                 | ❌               | ❌      | ❌       | ❌           | ✅     | ✅    | —                | — Excluded: `aspect-ratio` CSS property handles this natively                                            |
| Grid List (tile grid)                        | ✅               | ❌      | ❌       | ❌           | ❌     | ❌    | —                | — Excluded: Grid layout primitive + CSS handles this                                                     |

---

## Build Queue (Add decisions, prioritised)

Work this list after the current hardening milestone is complete. Priority is based on:
developer demand, how many reference libraries include it, and complexity.

| Priority | Component                          | Rationale                                                                                             | Complexity  | Reference                                             |
| -------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------- |
| 1        | **DateRangePicker**                | Every library has it; date range selection is a daily developer need                                  | Medium      | PrimeNG, Ng-Zorro, Material DateRangePicker           |
| 2        | **TimePicker**                     | Standalone time input; extremely common in scheduling/booking UIs                                     | Low-Medium  | PrimeNG TimePicker, Ng-Zorro TimePicker               |
| 3        | **Empty State**                    | "No data" placeholder; every app needs this; almost no library ships it as a proper component         | Low         | Ng-Zorro Empty                                        |
| 4        | **Statistic / Number Display**     | Key metric display with label + trend; ubiquitous in dashboards                                       | Low         | Ng-Zorro Statistic                                    |
| 5        | **Typography**                     | Semantic Heading / Text / Code / Link / Blockquote with token-driven styling                          | Low         | Ng-Zorro Typography, shadcn/ui Typography             |
| 6        | **Descriptions / Definition List** | Key-value pair display; common in detail views and settings pages                                     | Low         | Ng-Zorro Descriptions                                 |
| 7        | **Segmented Control**              | View-switcher pattern (Grid / List, Day / Week / Month); distinct from SelectButton (which is toggle) | Low         | Ng-Zorro Segmented                                    |
| 8        | **Kbd / Keyboard Shortcut Badge**  | Display keyboard shortcuts inline in tooltips, menus, help text                                       | Very Low    | shadcn/ui Kbd                                         |
| 9        | **Splitter / Resizable Panels**    | Two or more resizable panes; needed in IDEs, dashboards, editors                                      | Medium-High | PrimeNG Splitter, Ng-Zorro Splitter, shadcn Resizable |
| 10       | **Scroll Area**                    | Custom-styled scrollbar overlay; preserves native scroll behaviour                                    | Medium      | Radix ScrollArea, shadcn/ui Scroll Area               |
| 11       | **Calendar (full view)**           | Full month/year grid for scheduling / event display; distinct from DatePicker                         | High        | PrimeNG Calendar, Ng-Zorro Calendar                   |
| 12       | **Navigation Menu**                | Top-level horizontal navigation with rich dropdown panels; distinct from Menubar                      | Medium      | Radix NavigationMenu, shadcn/ui Navigation Menu       |

---

## Horizon Queue (post-v1.0 candidates)

These are interesting, multiple libraries have them, but they are lower priority or higher
complexity. Revisit after v1.0 ships.

| Component                   | Why Horizon                                                                                | Reference                             |
| --------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------- |
| **Command Palette**         | Already in VISION.md; high complexity; requires global keyboard shortcut management        | shadcn/ui Command                     |
| **Hover Card**              | Rich tooltip-like card on hover; distinct from Tooltip; needs deliberate API design        | Radix HoverCard, shadcn/ui Hover Card |
| **Collapsible**             | Simple show/hide container; simpler than Accordion; useful but Accordion covers most cases | Radix Collapsible, shadcn Collapsible |
| **Result / Status Page**    | Full-area result states (success, error, 404, 403); useful in enterprise apps              | Ng-Zorro Result                       |
| **Anchor / TOC Navigation** | Scroll-anchored table of contents with active link highlighting                            | Ng-Zorro Anchor                       |

---

## Library-Wide "Beyond" Differentiators

Components or capabilities that this library ships and that no major reference library offers:

| Differentiator                                                 | Notes                                                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Signal-native API throughout                                   | No Angular library (Material, PrimeNG, Ng-Zorro) has fully migrated to `input()` / `model()` |
| Zoneless-compatible every component                            | None of the Angular libraries guarantee this                                                 |
| Three runtime visual variants (material / bootstrap / minimal) | No other Angular library supports runtime variant switching                                  |
| ImageCompare                                                   | Side-by-side image comparison slider — unique in the Angular ecosystem                       |
| Bottom Sheet as first-class component                          | Most Angular libraries don't distinguish Drawer from BottomSheet                             |
| `prefers-reduced-motion` on every animation                    | Systematically applied — not a checkbox afterthought                                         |
| axe-core a11y spec per component                               | Dedicated `.a11y.spec.ts` files — no other Angular library ships this                        |

---

## Full Reference Inventories

> Complete component lists for each audited library, preserved here for reference.
> Use these when researching a specific component's API, a11y behaviour, or design decisions.
> Verified against each library's documentation as of **2026-05-13**.

---

### Angular Material (~35 components)

> Docs: https://material.angular.dev/components/categories
> Philosophy: Opinionated Material Design 3, high quality, limited breadth.

| Category                       | Components                                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form Controls**              | Autocomplete, Checkbox, Chips (input), Datepicker, Date Range Picker, Form Field, Input, Radio Button, Select, Slide Toggle, Slider, Textarea |
| **Navigation**                 | Bottom Nav Bar, Menu, Sidenav / Drawer, Tabs, Toolbar                                                                                         |
| **Layout**                     | Card, Divider, Expansion Panel, Grid List, List, Stepper, Tree                                                                                |
| **Buttons & Indicators**       | Button, Button Toggle, FAB (Floating Action Button), Icon Button, Badge, Progress Bar, Progress Spinner                                       |
| **Popups & Modals**            | Bottom Sheet, Dialog, Snack Bar, Tooltip                                                                                                      |
| **Data Display**               | Paginator, Sort, Table                                                                                                                        |
| **CDK (Behaviour Primitives)** | Accordion, Drag & Drop, Focus Trap, Layout, Overlay, Portal, Scrolling, Virtual Scroll, A11y (FocusMonitor, LiveAnnouncer, AriaDescriber)     |

---

### PrimeNG (~95 components)

> Docs: https://primeng.org/
> Philosophy: Maximum breadth — if you can think of it, PrimeNG has it.

| Category                    | Components                                                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Form — Basic Inputs**     | InputText, Textarea, InputNumber, InputMask, InputGroup, Password, InputOtp, AutoComplete, CascadeSelect, ColorPicker, KeyFilter         |
| **Form — Selection**        | Checkbox, Tri-State Checkbox, RadioButton, ToggleSwitch, ToggleButton, SelectButton, MultiSelect, Listbox, Select (Dropdown), TreeSelect |
| **Form — Date & Time**      | DatePicker (Calendar), TimePicker                                                                                                        |
| **Form — Range & Misc**     | Slider, Rating, Knob, Editor (Rich Text), Mention                                                                                        |
| **Buttons**                 | Button, SplitButton, SpeedDial                                                                                                           |
| **Data — Table & Grid**     | DataTable (Table), TreeTable, DataView                                                                                                   |
| **Data — Hierarchical**     | Tree, TreeTable, OrderList, PickList, OrganizationChart                                                                                  |
| **Data — Scroll & Virtual** | VirtualScroller, DeferredContent                                                                                                         |
| **Data — Pagination**       | Paginator                                                                                                                                |
| **Data — Media**            | Carousel, Galleria, Image                                                                                                                |
| **Data — Charts**           | Chart (Bar, Line, Pie, Doughnut, Radar, Polar Area)                                                                                      |
| **Panels**                  | Panel, Accordion, Fieldset, Card, TabView (Tabs), Splitter, Divider, ScrollPanel, Toolbar                                                |
| **Overlay**                 | Dialog, DynamicDialog, Drawer (Sidebar), OverlayPanel (Popover), ConfirmDialog, ConfirmPopup, Tooltip                                    |
| **Messages & Feedback**     | Message, Messages, Toast, Alert                                                                                                          |
| **Navigation**              | Menu, Menubar, MegaMenu, PanelMenu, TieredMenu, ContextMenu, Breadcrumb, Steps (Stepper), TabMenu, Dock                                  |
| **Media & Misc**            | Avatar, AvatarGroup, Badge, Tag, Chip, Skeleton, ProgressBar, ProgressSpinner, MeterGroup                                                |
| **Utility**                 | BlockUI, FocusTrap, ScrollTop, Ripple, StyleClass, AnimateOnScroll, AutoFocus, Inplace, Terminal, Watermark                              |

---

### Ng-Zorro — Ant Design for Angular (~75 components)

> Docs: https://ng.ant.design/components/overview/en
> Philosophy: Enterprise-grade, rich functionality, strong i18n, Ant Design system.

| Category         | Components                                                                                                                                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **General**      | Button, Icon, Typography (Title / Text / Paragraph / Link / Code)                                                                                                                                                                                          |
| **Layout**       | Divider, Flex, Grid (Row / Col), Layout (Header / Sider / Content / Footer), Space, Splitter                                                                                                                                                               |
| **Navigation**   | Anchor, Breadcrumb, Dropdown, Menu, Page Header, Pagination, Steps, Tabs                                                                                                                                                                                   |
| **Data Entry**   | Auto Complete, Cascader (CascadeSelect), Checkbox, Color Picker, Date Picker, Date Range Picker, Form, Input, Input Number, Mention, Radio, Rate, Select, Slider, Switch (ToggleSwitch), Time Picker, Transfer, Tree Select, Upload                        |
| **Data Display** | Avatar, Badge, Calendar (full view), Card, Carousel, Collapse (Accordion), Comment, Descriptions (Definition List), Empty (Empty State), Image, List, Popover, QR Code, Segmented, Statistic (+ Countdown), Table, Tag, Timeline, Tooltip, Tree, Tree View |
| **Feedback**     | Alert, Drawer, Message (Toast), Modal (Dialog), Notification, Popconfirm (ConfirmPopup), Progress (Bar + Circle), Result (Status Page), Skeleton, Spin (Loading overlay)                                                                                   |
| **Other**        | Affix, Back Top (ScrollTop), Float Button, Watermark                                                                                                                                                                                                       |

---

### Ng-Bootstrap (~20 components)

> Docs: https://ng-bootstrap.github.io/#/components
> Philosophy: Thin Bootstrap 5 wrappers — familiar to Bootstrap users, limited beyond Bootstrap.

| Category             | Components                                                  |
| -------------------- | ----------------------------------------------------------- |
| **Layout & Display** | Accordion, Alert, Badge, Card (via Bootstrap CSS), Collapse |
| **Navigation**       | Breadcrumb, Nav (Tabs / Pills), Pagination                  |
| **Forms**            | Datepicker, Rating, Timepicker, Typeahead (AutoComplete)    |
| **Overlays**         | Dropdown, Modal, Offcanvas (Drawer), Popover, Tooltip       |
| **Feedback**         | Progress, Spinner, Toast                                    |
| **Media**            | Carousel                                                    |
| **Utility**          | Scrollspy                                                   |

---

### shadcn/ui (~71 components)

> Docs: https://ui.shadcn.com/docs/components
> Philosophy: Copy-paste React components — highest DX bar in any ecosystem.
> Note: React library. Included as the DX and API design reference.

| Category                     | Components                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| **Layout & Structure**       | Aspect Ratio, Card, Resizable (Splitter), Scroll Area, Separator (Divider), Sidebar       |
| **Typography & Display**     | Typography (H1–H4 / P / Lead / Muted / Code), Kbd, Badge, Avatar                          |
| **Form — Inputs**            | Input, Textarea, Checkbox, Radio Group, Select, Switch, Slider, Label, Input OTP          |
| **Form — Pickers**           | Calendar (full view), Date Picker, Combobox (AutoComplete)                                |
| **Buttons & Actions**        | Button, Toggle, Toggle Group                                                              |
| **Navigation**               | Breadcrumb, Menubar, Navigation Menu, Pagination, Tabs                                    |
| **Overlays & Popups**        | Alert Dialog, Dialog, Drawer, Dropdown Menu, Hover Card, Popover, Sheet (Drawer), Tooltip |
| **Data Display**             | Data Table, Table                                                                         |
| **Feedback & Status**        | Alert, Progress, Skeleton, Sonner (Toast), Spinner, Toast                                 |
| **Command & Search**         | Command (Command Palette)                                                                 |
| **Collapsible & Disclosure** | Accordion, Collapsible                                                                    |
| **Context & Menus**          | Context Menu                                                                              |
| **Charts**                   | Chart (Recharts wrapper)                                                                  |

---

### Radix UI Primitives (~30 primitives)

> Docs: https://www.radix-ui.com/primitives/docs/overview/introduction
> Philosophy: Unstyled, fully accessible, WAI-ARIA APG–compliant headless primitives.
> Note: React library. Included as the a11y correctness reference.

| Category              | Primitives                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Disclosure**        | Accordion, Collapsible                                                                                          |
| **Overlay**           | Alert Dialog, Dialog, Hover Card, Popover, Tooltip                                                              |
| **Menu & Navigation** | Context Menu, Dropdown Menu, Menubar, Navigation Menu, Toolbar                                                  |
| **Form Controls**     | Checkbox, Form, Label, OTP Field (One-Time Password), Radio Group, Select, Slider, Switch, Toggle, Toggle Group |
| **Data Display**      | Avatar, Progress, Scroll Area, Separator, Tabs                                                                  |
| **Utility**           | Aspect Ratio                                                                                                    |

---

## How to Use This Document

**When adding a component from the Build Queue:**

1. Check its entry in this table — the reference library URLs are your starting point
2. Research its APG pattern (if interactive) and add it to `COMPETITIVE_BENCHMARKS.md`
3. Follow `COMPONENT_CREATION_GUIDE.md` end-to-end
4. Mark the row in this table: ❌ → ✅ and record the date

**When a new component is proposed (not in this table):**

1. Add a row with the current ecosystem coverage
2. Apply the decision framework: Add / Horizon / Exclude with reason
3. If Add: insert it into the Build Queue at the appropriate priority

**When re-auditing:**

1. Check each reference library for components added since last audit date
2. Add any new rows with the same decision process
3. Update the "Last researched" date at the top of this file
