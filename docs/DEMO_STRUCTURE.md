# PrimeNG Documentation-Style Demo Structure

This document describes the new PrimeNG documentation-inspired layout structure implemented in the demo application.

## Overview

The demo application has been restructured to match the professional look and feel of the PrimeNG documentation site, featuring:

- **Fixed top navigation bar** with logo and action buttons
- **Collapsible left sidebar** with categorized component navigation
- **Clean white background** with card-based content sections
- **Responsive design** that works on mobile, tablet, and desktop
- **Code examples** with syntax highlighting
- **Properties tables** for API documentation

## Directory Structure

```
projects/demo/src/app/
├── layout/
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── sidebar.component.scss
│   └── topbar/
│       ├── topbar.component.ts
│       ├── topbar.component.html
│       └── topbar.component.scss
├── shared/
│   └── styles/
│       └── doc-page.scss          # Shared documentation page styles
├── pages/
│   ├── home/
│   ├── buttons/
│   ├── cards/
│   └── login/
├── app.ts
├── app.html
├── app.scss
└── app.routes.ts
```

## Components

### 1. Topbar Component
Located in `layout/topbar/`

**Features:**
- Fixed position at the top
- Logo with brand name
- Mobile menu toggle button (hamburger icon)
- Action buttons (GitHub, documentation, theme toggle)
- 80px height for consistent spacing

**Usage:**
```typescript
<app-topbar (menuButtonClick)="toggleSidebar()"></app-topbar>
```

### 2. Sidebar Component
Located in `layout/sidebar/`

**Features:**
- Fixed position on the left (250px width)
- Hierarchical navigation menu
- Expandable/collapsible sections
- Active route highlighting
- Smooth animations
- Mobile-responsive (slides in/out)

**Navigation Structure:**
```typescript
menuItems: NavItem[] = [
  {
    label: 'Getting Started',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Components',
    icon: 'pi pi-th-large',
    expanded: true,
    items: [
      { label: 'Button', icon: 'pi pi-circle', route: '/buttons' },
      { label: 'Card', icon: 'pi pi-id-card', route: '/cards' },
      // ... more components
    ]
  }
]
```

### 3. Main Layout
Located in `app.html` and `app.scss`

**Structure:**
```html
<div class="layout-wrapper">
  <app-topbar (menuButtonClick)="toggleSidebar()"></app-topbar>
  
  <div class="layout-container">
    <app-sidebar [class.mobile-visible]="sidebarVisible"></app-sidebar>
    
    <div class="layout-content">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

**Key Features:**
- Top margin of 80px to account for fixed topbar
- Left margin of 250px for sidebar (removed on mobile)
- Light gray background (#f8f9fa)
- Mobile mask overlay when sidebar is visible

## Shared Styles

### doc-page.scss
Located in `shared/styles/`

Provides consistent styling for all documentation pages:

**CSS Classes:**

- `.doc-page` - Main page container (max-width: 1200px)
- `.doc-header` - Page title and description
- `.doc-section` - White card sections for content
- `.doc-demo` - Demo area with light background
- `.doc-demo-group` - Group of related demos
- `.doc-code` - Code block styling
- `.doc-properties` - API properties table
- `.doc-tabs` - Tab navigation (for future use)

**Example Usage:**
```html
<div class="doc-page">
  <div class="doc-header">
    <h1>Button</h1>
    <p class="doc-description">Component description...</p>
  </div>

  <div class="doc-section">
    <h2>Basic Usage</h2>
    <div class="doc-demo centered">
      <!-- Component examples -->
    </div>
    <div class="doc-code">
      <pre><code><!-- Code example --></code></pre>
    </div>
  </div>
</div>
```

## Page Templates

Each component page follows this structure:

1. **Header** - Component name and description
2. **Sections** - One per variant or feature
3. **Demo Areas** - Live component examples
4. **Code Examples** - Implementation code
5. **Properties Table** - API documentation

### Example: Button Page

```html
<div class="doc-page">
  <div class="doc-header">
    <h1>Button</h1>
    <p class="doc-description">...</p>
  </div>

  <div class="doc-section">
    <h2>Material Design Variant</h2>
    <p>Description...</p>

    <div class="doc-demo-group">
      <h3>Colors</h3>
      <div class="doc-demo centered">
        <uilib-button>Example</uilib-button>
      </div>
      <div class="doc-code">
        <pre><code>...</code></pre>
      </div>
    </div>
  </div>

  <div class="doc-section">
    <h2>Properties</h2>
    <table class="doc-properties">...</table>
  </div>
</div>
```

## Responsive Behavior

### Desktop (> 968px)
- Sidebar always visible on the left
- Topbar shows logo text
- Content has left margin for sidebar

### Mobile (≤ 968px)
- Sidebar hidden by default
- Hamburger menu button visible
- Sidebar slides in from left when toggled
- Dark overlay mask appears behind sidebar
- Content takes full width
- Logo text may be hidden on very small screens

## Color Scheme

Following PrimeNG's clean, professional look:

- **Background**: #f8f9fa (light gray)
- **Cards**: #ffffff (white)
- **Borders**: #dee2e6 (light gray)
- **Primary**: #007bff (blue)
- **Text**: #495057 (dark gray)
- **Secondary Text**: #6c757d (medium gray)

## Adding New Components

To add a new component to the documentation:

1. **Create the component page** in `pages/`
2. **Add route** in `app.routes.ts`
3. **Add to sidebar** in `sidebar.component.ts`:
   ```typescript
   {
     label: 'New Component',
     icon: 'pi pi-icon-name',
     route: '/new-component'
   }
   ```
4. **Use doc-page styles** by importing in component SCSS:
   ```scss
   @import '../../shared/styles/doc-page.scss';
   ```
5. **Follow the page template** structure shown above

## Icons

The project uses PrimeIcons. Common icons:

- `pi pi-home` - Home
- `pi pi-circle` - Component items
- `pi pi-th-large` - Components group
- `pi pi-bars` - Menu hamburger
- `pi pi-github` - GitHub
- `pi pi-book` - Documentation
- `pi pi-moon` / `pi pi-sun` - Theme toggle

Full icon list: https://primeng.org/icons

## Running the Demo

```bash
cd ui-lib2
npm start
```

The demo will be available at `http://localhost:4200`

## Future Enhancements

Potential improvements:

- [ ] Tab system for Preview/Code/API views
- [ ] Dark theme support
- [ ] Search functionality in sidebar
- [ ] Breadcrumb navigation
- [ ] Copy-to-clipboard for code examples
- [ ] Syntax highlighting for code blocks
- [ ] Anchor links for sections
- [ ] Table of contents for long pages
- [ ] Keyboard navigation shortcuts

## References

- [PrimeNG Documentation](https://primeng.org/)
- [PrimeNG GitHub](https://github.com/primefaces/primeng)
- [Angular Documentation](https://angular.dev/)
