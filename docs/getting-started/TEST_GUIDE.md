# Test Your UI Library - 5 Minute Guide

## Quick Test in a New Angular Project

### Step 1: Create a Test Project (2 minutes)

Open a **NEW terminal** (keep the demo running in the current one) and run:

```bash
# Navigate to a different folder (not inside ui-lib2)
cd D:\Work\Personal\Github

# Create a new Angular project
ng new test-ui-lib --routing=false --style=css

# When prompted, select:
# - Zoneless: Yes or No (doesn't matter)

cd test-ui-lib
```

### Step 2: Link the UI Library (30 seconds)

```bash
# First, create the link in the library (if not done already)
cd D:\Work\Personal\Github\ui-lib2\ui-lib2\dist\ui-components
npm link

# Then link it in your test project
cd D:\Work\Personal\Github\test-ui-lib
npm link ui-components
```

### Step 3: Use the Components (2 minutes)

Edit `src/app/app.ts`:

```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-components';

@Component({
  selector: 'app-root',
  imports: [Button, Card],
  template: `
    <div style="padding: 2rem; background: #f5f5f5; min-height: 100vh;">
      <h1>Testing UI Components Library</h1>
      
      <div style="margin: 2rem 0;">
        <h2>Buttons</h2>
        <div style="display: flex; gap: 1rem; margin: 1rem 0;">
          <uilib-button variant="material" color="primary">Material</uilib-button>
          <uilib-button variant="bootstrap" color="success">Bootstrap</uilib-button>
          <uilib-button variant="minimal" color="danger">Minimal</uilib-button>
        </div>
      </div>

      <div style="margin: 2rem 0;">
        <h2>Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <uilib-card variant="material" elevation="medium">
            <div card-header>Material Card</div>
            <p>This is a Material Design card.</p>
            <div card-footer>
              <uilib-button variant="material" size="small">Action</uilib-button>
            </div>
          </uilib-card>

          <uilib-card variant="bootstrap" [bordered]="true">
            <div card-header>Bootstrap Card</div>
            <p>This is a Bootstrap-styled card.</p>
          </uilib-card>

          <uilib-card variant="minimal" [hoverable]="true">
            <div card-header>Minimal Card</div>
            <p>Hover over this card!</p>
          </uilib-card>
        </div>
      </div>

      <div style="margin: 2rem 0;">
        <h2>Interactive Example</h2>
        <uilib-card variant="material">
          <div card-header>Counter: {{ count }}</div>
          <p>Click the buttons to change the count</p>
          <div card-footer>
            <div style="display: flex; gap: 0.5rem;">
              <uilib-button 
                variant="material" 
                color="primary" 
                size="small"
                (click)="increment()">
                Increment
              </uilib-button>
              <uilib-button 
                variant="bootstrap" 
                color="danger" 
                size="small"
                (click)="decrement()">
                Decrement
              </uilib-button>
              <uilib-button 
                variant="minimal" 
                color="secondary" 
                size="small"
                (click)="reset()">
                Reset
              </uilib-button>
            </div>
          </div>
        </uilib-card>
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
<uilib-button variant="bootstrap" color="warning" size="large">
  Large Warning
</uilib-button>
```

### Change Card Elevation:
```html
<uilib-card variant="material" elevation="high" [hoverable]="true">
  High elevation card
</uilib-card>
```

### Make Full-Width Buttons:
```html
<uilib-button variant="material" [fullWidth]="true">
  Full Width Button
</uilib-button>
```

---

## 🔄 Making Changes to the Library

1. **Edit a component** in `D:\Work\Personal\Github\ui-lib2\ui-lib2\projects\ui-components\src\lib\`

2. **Rebuild the library:**
   ```bash
   cd D:\Work\Personal\Github\ui-lib2\ui-lib2
   ng build ui-components
   ```

3. **Refresh your test app** - Changes will be automatically available!

For continuous development, use watch mode:
```bash
ng build ui-components --watch
```

---

## 🚀 Next: Use in Your Real Projects

Once you've tested it, you can use the **exact same steps** in any of your real Angular projects!

```bash
cd /path/to/your/real/project
npm link ui-components
```

Then import and use the components just like in this test!

---

## 📝 Alternative: Without npm link

If you don't want to use npm link, add this to your project's `package.json`:

```json
{
  "dependencies": {
    "ui-components": "file:../ui-lib2/ui-lib2/dist/ui-components"
  }
}
```

Then run: `npm install`

---

## 🎉 That's It!

You now have a working UI component library that you can use across all your Angular projects!

**Key Points:**
- Library is built and ready: `dist/ui-components/`
- Use `npm link` for easy development
- Import components: `import { Button, Card } from 'ui-components'`
- Use in templates: `<uilib-button>` and `<uilib-card>`
- Three design variants: Material, Bootstrap, Minimal

**Happy coding! 🚀**
