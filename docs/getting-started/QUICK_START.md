# Quick Start Guide - UI Components Library

## Prerequisites

Before running the demo application, you need to:

1. **Install dependencies** (if not already done):
   ```bash
   cd D:\Work\Personal\Github\ui-lib2\ui-lib2
   npm install
   ```

2. **Build the UI components library first** (REQUIRED):
   ```bash
   ng build ui-components
   ```
   
   ⚠️ **Important**: You must build the library before running the demo app. The demo imports components from the built library in `dist/ui-components/`. Without building first, you'll get module import errors.

3. **Start the demo application**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   ng serve demo
   ```

## What You Have Now

✅ **Angular UI Components Library** with:
- Button component (3 design variants: Material, Bootstrap, Minimal)
- Card component (3 design variants: Material, Bootstrap, Minimal)
- Built library in `dist/ui-components/`
- Demo application ready to run

✅ **Demo Application** showcasing all components:
- Access at: http://localhost:4200 (when running)
- Shows all variants, sizes, colors, and configurations

## View the Demo

After building the library and starting the server, open your browser and navigate to:

**http://localhost:4200**

You'll see:
- All button variants (Material, Bootstrap, Minimal)
- All button sizes (Small, Medium, Large)
- All color options (Primary, Secondary, Success, Danger, Warning)
- All card variants with different configurations
- Real-world usage examples

## Project Structure

```
ui-lib2/
├── projects/
│   ├── ui-components/           # Your UI library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── button/     # Button component
│   │   │   │   │   ├── button.ts
│   │   │   │   │   ├── button.html
│   │   │   │   │   └── button.css
│   │   │   │   └── card/       # Card component
│   │   │   │       ├── card.ts
│   │   │   │       ├── card.html
│   │   │   │       └── card.css
│   │   │   └── public-api.ts   # Public exports
│   │   └── package.json
│   └── demo/                    # Demo application
│       └── src/
│           └── app/
│               ├── app.ts       # Demo component
│               ├── app.html     # Demo template
│               └── app.css      # Demo styles
├── dist/
│   └── ui-components/           # Built library (ready to publish)
└── README.md                    # Documentation
```

## Using the Library in Your Other Angular Projects

### Method 1: npm link (Recommended for Development)

**One-time setup in the library:**
```bash
cd D:\Work\Personal\Github\ui-lib2\ui-lib2\dist\ui-components
npm link
```

**In any Angular project where you want to use it:**
```bash
cd /path/to/your/angular/project
npm link ui-components
```

**Use in your components:**
```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-components';

@Component({
  selector: 'app-example',
  imports: [Button, Card],
  template: `
    <uilib-button variant="material" color="primary">
      Hello from my project!
    </uilib-button>
    
    <uilib-card variant="material">
      <div card-header>My Card</div>
      <p>This is working!</p>
    </uilib-card>
  `
})
export class ExampleComponent {}
```

### Method 2: Local File Path

**In your other project's package.json:**
```json
{
  "dependencies": {
    "ui-components": "file:../ui-lib2/ui-lib2/dist/ui-components"
  }
}
```

Then run:
```bash
npm install
```

### Method 3: Publish to npm

1. **Build the library:**
   ```bash
   cd D:\Work\Personal\Github\ui-lib2\ui-lib2
   ng build ui-components --configuration production
   ```

2. **Update package name in** `projects/ui-components/package.json`:
   ```json
   {
     "name": "@your-username/ui-components",
     "version": "1.0.0"
   }
   ```

3. **Publish:**
   ```bash
   cd dist/ui-components
   npm login
   npm publish --access public
   ```

4. **Install in other projects:**
   ```bash
   npm install @your-username/ui-components
   ```

## Component Examples

### Button Component

```html
<!-- Different Variants -->
<uilib-button variant="material" color="primary">Material</uilib-button>
<uilib-button variant="bootstrap" color="success">Bootstrap</uilib-button>
<uilib-button variant="minimal" color="danger">Minimal</uilib-button>

<!-- Different Sizes -->
<uilib-button size="small">Small</uilib-button>
<uilib-button size="medium">Medium</uilib-button>
<uilib-button size="large">Large</uilib-button>

<!-- States -->
<uilib-button [disabled]="true">Disabled</uilib-button>
<uilib-button [fullWidth]="true">Full Width</uilib-button>

<!-- With Click Handler -->
<uilib-button 
  variant="material" 
  color="primary"
  (click)="handleClick()">
  Click Me
</uilib-button>
```

### Card Component

```html
<!-- Full Card with Header and Footer -->
<uilib-card variant="material" elevation="medium">
  <div card-header>Card Title</div>
  
  <p>Card content goes here...</p>
  <p>You can put any HTML content inside.</p>
  
  <div card-footer>
    <uilib-button variant="material" size="small">Action</uilib-button>
  </div>
</uilib-card>

<!-- Simple Card -->
<uilib-card variant="bootstrap">
  <p>Simple card without header or footer</p>
</uilib-card>

<!-- Hoverable Card -->
<uilib-card 
  variant="minimal" 
  [hoverable]="true"
  [bordered]="true">
  <p>Hover over me!</p>
</uilib-card>
```

## Common Commands

### Rebuild the Library
```bash
cd D:\Work\Personal\Github\ui-lib2\ui-lib2
ng build ui-components
```

### Watch Mode (Auto-rebuild on changes)
```bash
ng build ui-components --watch
```

### Run Demo Application
```bash
ng serve demo
```

### Stop Demo Server
Press `Ctrl+C` in the terminal where it's running

## Making Changes to Components

1. **Edit component files** in `projects/ui-components/src/lib/`
2. **Rebuild the library:**
   ```bash
   ng build ui-components
   ```
3. **The demo will automatically refresh** if it's running in watch mode
4. **Projects using npm link will automatically get the updates**

## Adding New Components

### Generate a new component:
```bash
ng generate component your-component --project=ui-components --export
```

### Add it to the public API:
Edit `projects/ui-components/src/public-api.ts`:
```typescript
export * from './lib/your-component/your-component';
```

### Rebuild:
```bash
ng build ui-components
```

## Design Variants Explained

### Material Design
- Clean shadows with elevation
- Smooth animations
- Modern, flat appearance
- Perfect for: Modern web apps, dashboards

### Bootstrap
- Traditional button/card styling
- Subtle borders and gradients
- Familiar look and feel
- Perfect for: Business apps, admin panels

### Minimal
- Clean lines, minimal shadows
- Border-based design
- Content-focused
- Perfect for: Blogs, content sites, minimal UIs

## Next Steps

1. ✅ **Test the demo** - Open http://localhost:4200
2. ✅ **Use npm link** - Link the library to your other projects
3. ✅ **Import and use** - Start using Button and Card components
4. 📦 **Add more components** - Create Input, Select, Modal, etc.
5. 🚀 **Publish to npm** - Share with the world (optional)

## Need Help?

- Check `README.md` for detailed API documentation
- Check `PUBLISHING_GUIDE.md` for publishing instructions
- Look at the demo app code in `projects/demo/src/app/` for examples

## Success! 🎉

Your UI component library is ready to use! You can now:
- ✅ View all components in the demo at http://localhost:4200
- ✅ Use the components in your other Angular projects
- ✅ Extend with more components
- ✅ Customize the variants
- ✅ Publish to npm when ready

**The full workflow is complete from development to consumption!**
