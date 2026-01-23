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
