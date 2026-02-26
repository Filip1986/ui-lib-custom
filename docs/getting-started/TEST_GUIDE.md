# Test Your UI Library - 5 Minute Guide

## Quick Test in a New Angular Project

### Step 1: Create a Test Project (2 minutes)

Open a **NEW terminal** (keep the demo running in the current one) and run:

```bash
# Navigate to a different folder (not inside ui-lib-custom)
cd D:\Work\Personal\Github

# Create a new Angular project
ng new test-ui-lib --routing=false --style=css

# When prompted, select:
# - Zoneless: Yes or No (doesn't matter)

cd test-ui-lib
```

### Link the Library

```bash
# First, create the link in the library (if not done already)
cd D:\Work\Personal\Github\ui-lib-custom\dist\ui-lib-custom
npm link

# Then link it in your test project
cd D:\Work\Personal\Github\test-ui-lib
npm link ui-lib-custom
```

### Step 3: Use the Components (2 minutes)

Edit `src/app/app.ts`:

```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-lib-custom';

@Component({
  selector: 'app-root',
  imports: [Button, Card],
  template: `
    <div style="padding: 2rem; background: #f5f5f5; min-height: 100vh;">
      <h1>Testing UI Components Library</h1>
      
      <div style="margin: 2rem 0;">
        <h2>Buttons</h2>
        <div style="display: flex; gap: 1rem; margin: 1rem 0;">
          <ui-lib-button variant="material" color="primary">Material</ui-lib-button>
          <ui-lib-button variant="bootstrap" color="success">Bootstrap</ui-lib-button>
          <ui-lib-button variant="minimal" color="danger">Minimal</ui-lib-button>
        </div>
      </div>

      <div style="margin: 2rem 0;">
        <h2>Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <ui-lib-card variant="material" elevation="medium">
            <div card-header>Material Card</div>
            <p>This is a Material Design card.</p>
            <div card-footer>
              <ui-lib-button variant="material" size="small">Action</ui-lib-button>
            </div>
          </ui-lib-card>

          <ui-lib-card variant="bootstrap" [bordered]="true">
            <div card-header>Bootstrap Card</div>
            <p>This is a Bootstrap-styled card.</p>
          </ui-lib-card>

          <ui-lib-card variant="minimal" [hoverable]="true">
            <div card-header>Minimal Card</div>
            <p>Hover over this card!</p>
          </ui-lib-card>
        </div>
      </div>

      <div style="margin: 2rem 0;">
        <h2>Interactive Example</h2>
        <ui-lib-card variant="material">
          <div card-header>Counter: {{ count }}</div>
          <p>Click the buttons to change the count</p>
          <div card-footer>
            <div style="display: flex; gap: 0.5rem;">
              <ui-lib-button 
                variant="material" 
                color="primary" 
                size="small"
                (click)="increment()">
                Increment
              </ui-lib-button>
              <ui-lib-button 
                variant="bootstrap" 
                color="danger" 
                size="small"
                (click)="decrement()">
                Decrement
              </ui-lib-button>
              <ui-lib-button 
                variant="minimal" 
                color="secondary" 
                size="small"
                (click)="reset()">
                Reset
              </ui-lib-button>
            </div>
          </div>
        </ui-lib-card>
      </div>
    </div>
  `,
  styles: [`
    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
    h2 {
      color: #666;
      margin: 1rem 0;
    }
  `]
})
export class AppComponent {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
```

### Step 4: Run and Test (30 seconds)

```bash
ng serve
```

Open **http://localhost:4200** in your browser!

You should see:
- Three buttons with different variants
- Three cards with different designs
- An interactive counter that works with your buttons

---

## ✅ Success Checklist

If you can see and interact with the components, congratulations! ✨

- ✅ Library is working
- ✅ Components render correctly
- ✅ Styles are applied
- ✅ Events work (counter increases/decreases)
- ✅ All variants display properly

---

## 🎨 Experiment More

Try changing the examples:

### Change Button Variants:
```html
<ui-lib-button variant="bootstrap" color="warning" size="large">
  Large Warning
</ui-lib-button>
```

### Change Card Elevation:
```html
<ui-lib-card variant="material" elevation="high" [hoverable]="true">
  High elevation card
</ui-lib-card>
```

### Make Full-Width Buttons:
```html
<ui-lib-button variant="material" [fullWidth]="true">
  Full Width Button
</ui-lib-button>
```

---

### Workflow for Changes

1. **Edit a component** in `D:\Work\Personal\Github\ui-lib-custom\projects\ui-lib-custom\src\lib\`

2. **Rebuild the library:**
   ```bash
   cd D:\Work\Personal\Github\ui-lib-custom
   ng build ui-lib-custom
   ```

3. **Refresh your test app** - Changes will be automatically available!

For continuous development, use watch mode:
```bash
ng build ui-lib-custom --watch
```

---

## 🚀 Next: Use in Your Real Projects

Once you've tested it, you can use the **exact same steps** in any of your real Angular projects!

```bash
cd /path/to/your/real/project
npm link ui-lib-custom
```

Then import and use the components just like in this test!

---

## 📝 Alternative: Without npm link

If you don't want to use npm link, add this to your project's `package.json`:

```json
{
  "dependencies": {
    "ui-lib-custom": "file:../ui-lib-custom/dist/ui-lib-custom"
  }
}
```

Then run: `npm install`

---

## 🎉 That's It!

You now have a working UI component library that you can use across all your Angular projects!

**Key Points:**
- Library is built and ready: `dist/ui-lib-custom/`
- Use `npm link` for easy development
- Import components: `import { Button, Card } from 'ui-lib-custom'`
- Use in templates: `<ui-lib-button>` and `<ui-lib-card>`
- Three design variants: Material, Bootstrap, Minimal

**Happy coding! 🚀**

---

## Consumer Test (Verified)

### Steps

```powershell
Set-ExecutionPolicy -Scope Process Bypass

# Build the library
cd D:\Work\Personal\Github\ui-lib-custom
ng build ui-lib-custom

# Create a new consumer app
cd D:\Work\Personal\Github
ng new consumer-test --standalone --routing --style=scss --skip-git --no-interactive

# Pin Angular to match library build
cd D:\Work\Personal\Github\consumer-test
npm install @angular/common@21.1.5 @angular/compiler@21.1.5 @angular/core@21.1.5 @angular/forms@21.1.5 @angular/platform-browser@21.1.5 @angular/router@21.1.5 @angular/cli@21.1.5 @angular/compiler-cli@21.1.5 @angular/build@21.1.5 typescript@5.9.3 --save-exact

# Install the library from dist
npm install ..\ui-lib-custom\dist\ui-lib-custom
```

Add global theme styles in `src/styles.scss`:

```scss
@import 'ui-lib-custom/themes/themes.css';
```

### Consumer App Code

`src/app/app.ts`
```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { UiLibInput } from 'ui-lib-custom/input';
import { ThemeConfigService } from 'ui-lib-custom/theme';

@Component({
  selector: 'app-root',
  imports: [Button, Card, UiLibInput, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly theme = inject(ThemeConfigService);

  name = '';
  email = '';
  isDark = false;

  setBootstrapVariant(): void {
    this.theme.setVariant('bootstrap');
  }

  setPillShape(): void {
    this.theme.setShape('pill');
  }

  toggleDarkMode(): void {
    this.isDark = !this.isDark;
    this.theme.setMode(this.isDark ? 'dark' : 'light');
  }
}
```

`src/app/app.html`
```html
<main class="demo">
  <ui-lib-card variant="material" class="demo-card">
    <div card-header>Consumer Test Form</div>
    <form class="demo-form">
      <ui-lib-input
        label="Name"
        placeholder="Ada Lovelace"
        name="name"
        [(ngModel)]="name"
      />
      <ui-lib-input
        label="Email"
        placeholder="ada@example.com"
        name="email"
        [(ngModel)]="email"
      />
    </form>
    <div card-footer class="demo-actions">
      <ui-lib-button (click)="setBootstrapVariant()">Variant: Bootstrap</ui-lib-button>
      <ui-lib-button (click)="setPillShape()">Shape: Pill</ui-lib-button>
      <ui-lib-button (click)="toggleDarkMode()">
        Dark Mode: {{ isDark ? 'On' : 'Off' }}
      </ui-lib-button>
    </div>
  </ui-lib-card>
</main>
```

### Build and Serve

```powershell
ng build
ng serve --port 4300
```

### Results

- ✅ `ng build` succeeds with Angular 21.1.5.
- ✅ `ng serve` renders the form and theme controls.
- ✅ Theme controls update variant, shape, and dark mode in real time.

### Issues Found (Resolved)

1. **Signal input brand mismatch** when consumer app used Angular 20/21.2.
   - Fix: pin consumer app to Angular `21.1.5` to match the library build.
2. **Theme CSS import not exported** (`ui-lib-custom/themes/themes.css`).
   - Fix: expose theme assets via `exports` and copy assets to package root.
