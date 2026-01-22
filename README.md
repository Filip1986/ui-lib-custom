# UI Components Library

A flexible Angular UI component library with multiple design variants (Material, Bootstrap, and Minimal) that can be easily integrated into your Angular projects.

## 📚 Documentation

**New here?** Check out the complete documentation: **[📖 Documentation Index](docs/README.md)**

Quick links:
- 🚀 [Quick Start Guide](docs/getting-started/QUICK_START.md) - Get started in 5 minutes
- 📘 [Integration Examples](docs/guides/INTEGRATION_EXAMPLE.md) - Real-world usage examples
- 🏗️ [Architecture](docs/architecture/ARCHITECTURE.md) - System design and structure
- 📦 [Publishing Guide](docs/guides/PUBLISHING_GUIDE.md) - How to publish and distribute

## Features

- 🎨 **Multiple Design Variants**: Choose between Material Design, Bootstrap, and Minimal styles
- 🔧 **Highly Configurable**: Extensive input properties for customization
- 📦 **Easy Integration**: Simple npm install and import
- 🚀 **Modern Angular**: Built with standalone components and latest Angular features
- 💪 **TypeScript**: Full TypeScript support with type definitions
- 🎯 **Zero Dependencies**: No external CSS frameworks required

## Components

### Button Component

A versatile button component with multiple variants, sizes, and colors.

**Variants**: `material` | `bootstrap` | `minimal`  
**Sizes**: `small` | `medium` | `large`  
**Colors**: `primary` | `secondary` | `success` | `danger` | `warning`

#### Usage

```typescript
import { Button } from 'ui-components';

@Component({
  imports: [Button],
  // ...
})
export class YourComponent {}
```

```html
<!-- Material Design Button -->
<uilib-button variant="material" color="primary">Click Me</uilib-button>

<!-- Bootstrap Button -->
<uilib-button variant="bootstrap" size="large" color="success">Submit</uilib-button>

<!-- Minimal Button -->
<uilib-button variant="minimal" color="danger" [disabled]="true">Delete</uilib-button>

<!-- Full Width Button -->
<uilib-button variant="material" [fullWidth]="true">Full Width</uilib-button>
```

### Card Component

A flexible card component with support for headers, footers, and different elevation levels.

**Variants**: `material` | `bootstrap` | `minimal`  
**Elevation**: `none` | `low` | `medium` | `high`

#### Usage

```typescript
import { Card } from 'ui-components';

@Component({
  imports: [Card],
  // ...
})
export class YourComponent {}
```

```html
<!-- Material Design Card -->
<uilib-card variant="material" elevation="medium">
  <div card-header>Card Title</div>
  <p>Card content goes here...</p>
  <div card-footer>
    <button>Action</button>
  </div>
</uilib-card>

<!-- Bootstrap Card with Border -->
<uilib-card variant="bootstrap" [bordered]="true">
  <p>Simple card content</p>
</uilib-card>

<!-- Minimal Hoverable Card -->
<uilib-card variant="minimal" [hoverable]="true">
  <div card-header>Hover over me!</div>
  <p>This card will respond to hover events.</p>
</uilib-card>
```

## Installation

```bash
npm install ui-components
```

## Getting Started

1. Install the package:
```bash
npm install ui-components
```

2. Import the components in your Angular component:
```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-components';

@Component({
  selector: 'app-root',
  imports: [Button, Card],
  template: `
    <uilib-button variant="material" color="primary">
      Hello World
    </uilib-button>
    
    <uilib-card variant="material">
      <div card-header>Welcome</div>
      <p>This is a card component</p>
    </uilib-card>
  `
})
export class AppComponent {}
```

## Building Locally

If you want to build the library from source:

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd ui-lib2/ui-lib2
npm install

# Build the library
ng build ui-components

# Run the demo application
ng serve demo
```

## Design Variants

### Material Design
Clean, modern design with elevation shadows and smooth animations. Perfect for contemporary applications.

### Bootstrap
Traditional Bootstrap-inspired styling with subtle borders and gradients. Great for business applications.

### Minimal
Clean, borderless design with minimal shadows. Ideal for content-focused layouts.

## API Reference

### Button

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| variant | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| color | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'primary'` | Button color |
| disabled | `boolean` | `false` | Disabled state |
| fullWidth | `boolean` | `false` | Full width button |

### Card

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| variant | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant |
| elevation | `'none' \| 'low' \| 'medium' \| 'high'` | `'medium'` | Shadow elevation |
| bordered | `boolean` | `false` | Add border |
| hoverable | `boolean` | `false` | Enable hover effects |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about:
- Setting up your development environment
- Where to add new documentation
- Component development guidelines
- Pull request process

Feel free to submit a Pull Request or open an issue!
