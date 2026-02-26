# Quick Start Guide - UI Components Library

## Prerequisites

Before running the demo application, you need to:

1. **Install dependencies** (if not already done):
   ```bash
   cd D:\Work\Personal\Github\ui-lib-custom
   npm install
   ```

2. **Build the UI components library first** (REQUIRED):
   ```bash
   ng build ui-lib-custom
   ```
   
   ⚠️ **Important**: You must build the library before running the demo app. The demo imports components from the built library in `dist/ui-lib-custom/`. Without building first, you'll get module import errors.

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
- Built library in `dist/ui-lib-custom/`
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
ui-lib-custom/
├── projects/
│   ├── ui-lib-custom/           # Your UI library
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
│   └── ui-lib-custom/           # Built library (ready to publish)
└── README.md                    # Documentation
```

## Using the Library in Your Other Angular Projects

### Method 1: npm link (Recommended for Development)

**One-time setup in the library:**
```bash
cd D:\Work\Personal\Github\ui-lib-custom\dist\ui-lib-custom
npm link
```

**In any Angular project where you want to use it:**
```bash
cd /path/to/your/angular/project
npm link ui-lib-custom
```

**Use in your components:**
```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-lib-custom';

@Component({
  selector: 'app-example',
  imports: [Button, Card],
  template: `
    <ui-lib-button variant="material" color="primary">
      Hello from my project!
    </ui-lib-button>
    
    <ui-lib-card variant="material">
      <div card-header>My Card</div>
      <p>This is working!</p>
    </ui-lib-card>
  `
})
export class ExampleComponent {}
```

### Method 2: Local File Path

In your project's `package.json`:
```json
{
  "dependencies": {
    "ui-lib-custom": "file:../ui-lib-custom/dist/ui-lib-custom"
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
   cd D:\Work\Personal\Github\ui-lib-custom
   ng build ui-lib-custom --configuration production
   ```

2. **Update package name in** `projects/ui-lib-custom/package.json`:
   ```json
   {
     "name": "@your-username/ui-lib-custom",
     "version": "1.0.0"
   }
   ```

3. **Publish:**
   ```bash
   cd dist/ui-lib-custom
   npm login
   npm publish --access public
   ```

4. **Install in other projects:**
   ```bash
   npm install @your-username/ui-lib-custom
   ```

## Component Examples

### Button Component

```html
<!-- Different Variants -->
<ui-lib-button variant="material" color="primary">Material</ui-lib-button>
<ui-lib-button variant="bootstrap" color="success">Bootstrap</ui-lib-button>
<ui-lib-button variant="minimal" color="danger">Minimal</ui-lib-button>

<!-- Different Sizes -->
<ui-lib-button size="small">Small</ui-lib-button>
<ui-lib-button size="medium">Medium</ui-lib-button>
<ui-lib-button size="large">Large</ui-lib-button>

<!-- States -->
<ui-lib-button [disabled]="true">Disabled</ui-lib-button>
<ui-lib-button [fullWidth]="true">Full Width</ui-lib-button>

<!-- With Click Handler -->
<ui-lib-button 
  variant="material" 
  color="primary"
  (click)="handleClick()">
  Click Me
</ui-lib-button>
```

### Card Component

```html
<!-- Full Card with Header and Footer -->
<ui-lib-card variant="material" elevation="medium">
  <div card-header>Card Title</div>
  
  <p>Card content goes here...</p>
  <p>You can put any HTML content inside.</p>
  
  <div card-footer>
    <ui-lib-button variant="material" size="small">Action</ui-lib-button>
  </div>
</ui-lib-card>

<!-- Simple Card -->
<ui-lib-card variant="bootstrap">
  <p>Simple card without header or footer</p>
</ui-lib-card>

<!-- Hoverable Card -->
<ui-lib-card 
  variant="minimal" 
  [hoverable]="true"
  [bordered]="true">
  <p>Hover over me!</p>
</ui-lib-card>
```

## Common Commands

### Rebuild the Library
```bash
cd D:\Work\Personal\Github\ui-lib-custom
ng build ui-lib-custom
```

### Watch Mode (Auto-rebuild on changes)
```bash
ng build ui-lib-custom --watch
```

### Run Demo Application
```bash
ng serve demo
```

### Stop Demo Server
Press `Ctrl+C` in the terminal where it's running

## Making Changes to Components

1. **Edit component files** in `projects/ui-lib-custom/src/lib/`
2. **Rebuild the library:**
   ```bash
   ng build ui-lib-custom
   ```
3. **The demo will automatically refresh** if it's running in watch mode
4. **Projects using npm link will automatically get the updates**

## Adding New Components

### Generate a new component:
```bash
ng generate component your-component --project=ui-lib-custom --export
```

### Add it to the public API:
Edit `projects/ui-lib-custom/src/public-api.ts`:
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

## Theming (light/dark)

1. Import the library theme variables once (e.g., in your global styles):
   ```scss
   @import 'ui-lib-custom/themes/themes.css';
   ```
2. Toggle themes by setting `data-theme="light" | "dark"` on `html` or any container. Example:
   ```typescript
   // in your root component
   document.documentElement.setAttribute('data-theme', 'dark');
   ```
3. Components read CSS variables; override `--uilib-*` tokens in your own theme file for branding.

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

## Consumer Install Test (Verified)

Use these exact steps to validate the library from a clean consumer app:

```powershell
# Build the library
Set-ExecutionPolicy -Scope Process Bypass
cd D:\Work\Personal\Github\ui-lib-custom
ng build ui-lib-custom

# Create a fresh consumer app (outside workspace)
cd D:\Work\Personal\Github
ng new consumer-test --standalone --routing --style=scss --skip-git --no-interactive

# Pin Angular to 21.1.5 (match library build)
cd D:\Work\Personal\Github\consumer-test
npm install @angular/common@21.1.5 @angular/compiler@21.1.5 @angular/core@21.1.5 @angular/forms@21.1.5 @angular/platform-browser@21.1.5 @angular/router@21.1.5 @angular/cli@21.1.5 @angular/compiler-cli@21.1.5 @angular/build@21.1.5 typescript@5.9.3 --save-exact

# Install the library from dist
npm install ..\ui-lib-custom\dist\ui-lib-custom
```

Then update `src/styles.scss` in the consumer app:

```scss
@import 'ui-lib-custom/themes/themes.css';
```

And use Button/Card/Input + ThemeConfigService in `src/app/app.ts` and `src/app/app.html` (see `docs/getting-started/TEST_GUIDE.md` for the full example).
