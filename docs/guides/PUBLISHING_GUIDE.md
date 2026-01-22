# Publishing and Using the UI Components Library

## How to Publish the Library

### Option 1: Publish to npm (Public or Private Registry)

#### Prerequisites: npm Authentication Setup

npm requires two-factor authentication (2FA) for publishing packages. You have two options:

**Option A: Use Granular Access Token (Recommended)**

1. **Generate an access token:**
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token" → Select "Granular Access Token"
   - Give it a name (e.g., "ui-components-publish")
   - Set expiration (optional)
   - Under "Packages and scopes", select:
     - **Permissions**: "Read and write"
     - **Packages**: Select the specific package or "All packages"
   - Under "Organizations and repositories": Configure as needed
   - Check **"Bypass 2FA requirement"** (this is the key!)
   - Click "Generate Token"
   - **IMPORTANT:** Copy and save the token immediately (you won't see it again!)

2. **Configure npm to use the token:**
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
   ```

   Or create/edit `~/.npmrc` file and add:
   ```
   //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
   ```

**Option B: Enable 2FA on Your Account**

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/twofa
2. Enable two-factor authentication
3. Use `npm login` and follow the 2FA prompts
4. When publishing, you'll need to enter your 2FA code

#### Publishing Steps

1. **Update package.json with your publishing details:**
   
   > **IMPORTANT:** Edit the source package.json at `projects/ui-components/package.json`, NOT the dist version!
   > The dist version is regenerated on every build and any changes there will be lost.

   Update `projects/ui-components/package.json`:
   ```json
   {
     "name": "@yourusername/ui-components",
     "version": "1.0.0",
     "description": "Your library description",
     "author": "Your Name <your.email@example.com>",
     "license": "MIT",
     "keywords": ["angular", "components", "ui"],
     "repository": {
       "type": "git",
       "url": "https://github.com/yourusername/your-repo.git"
     },
     "bugs": {
       "url": "https://github.com/yourusername/your-repo/issues"
     },
     "homepage": "https://github.com/yourusername/your-repo#readme"
   }
   ```

2. **Build the library:**
   ```bash
   cd ui-lib2
   ng build ui-components
   ```
   This will generate the dist folder with your updated package.json metadata.

3. **Navigate to the dist folder:**
   ```bash
   cd dist/ui-components
   ```


4. **Verify you're logged in:**
   ```bash
   npm whoami
   ```

5. **Publish:**
   ```bash
   # For scoped packages (e.g., @yourusername/ui-components):
   npm publish --access public
   
   # For unscoped packages:
   npm publish
   ```

   If using 2FA (Option B), you'll be prompted for your 2FA code:
   ```bash
   npm publish --otp=YOUR_2FA_CODE
   ```

### Option 2: Use as Local Package with npm link

1. **Build the library:**
   ```bash
   cd ui-lib2
   ng build ui-components
   ```

2. **Create npm link:**
   ```bash
   cd dist/ui-components
   npm link
   ```

3. **In your other Angular project, link the package:**
   ```bash
   cd /path/to/your/other/project
   npm link ui-components
   ```

### Option 3: Use from Git Repository

1. **Build and commit:**
   ```bash
   ng build ui-components
   git add dist/ui-components
   git commit -m "Build library"
   git push
   ```

2. **Install in other projects:**
   ```bash
   npm install git+https://github.com/yourusername/ui-lib2.git#branch-name
   ```

### Option 4: Use from Local File System

1. **Build the library:**
   ```bash
   ng build ui-components
   ```

2. **In your other Angular project's package.json:**
   ```json
   {
     "dependencies": {
       "ui-components": "file:../ui-lib2/ui-lib2/dist/ui-components"
     }
   }
   ```

3. **Install:**
   ```bash
   npm install
   ```

## How to Use in Your Angular Projects

### 1. Installation

Choose one of the installation methods above. For published packages:

```bash
npm install ui-components
```

### 2. Import Components

In your Angular component file:

```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Card],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Your component logic
}
```

### 3. Use in Templates

```html
<!-- Button Examples -->
<uilib-button variant="material" color="primary">
  Click Me
</uilib-button>

<uilib-button 
  variant="bootstrap" 
  size="large" 
  color="success"
  (click)="onSubmit()">
  Submit Form
</uilib-button>

<uilib-button 
  variant="minimal" 
  [disabled]="isLoading"
  [fullWidth]="true">
  {{ isLoading ? 'Loading...' : 'Process' }}
</uilib-button>

<!-- Card Examples -->
<uilib-card variant="material" elevation="medium">
  <div card-header>User Information</div>
  
  <div class="user-details">
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </div>
  
  <div card-footer>
    <uilib-button variant="material" color="primary" size="small">
      Edit
    </uilib-button>
    <uilib-button variant="minimal" color="secondary" size="small">
      Cancel
    </uilib-button>
  </div>
</uilib-card>

<uilib-card 
  variant="bootstrap" 
  [bordered]="true"
  [hoverable]="true"
  (click)="onCardClick()">
  <p>Clickable card with hover effect</p>
</uilib-card>
```

### 4. Module-Based Projects (Non-Standalone)

If you're using traditional NgModule-based components:

```typescript
import { NgModule } from '@angular/core';
import { Button, Card } from 'ui-components';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    // Other modules
    Button,
    Card
  ]
})
export class YourModule { }
```

## Complete Example Project Setup

### Step 1: Create a new Angular project

```bash
ng new my-app
cd my-app
```

### Step 2: Install the UI components library

```bash
# If published to npm
npm install ui-components

# Or use npm link
npm link ui-components

# Or use local file
npm install ../ui-lib2/ui-lib2/dist/ui-components
```

### Step 3: Create a component

```bash
ng generate component user-profile
```

### Step 4: Use the library components

**user-profile.component.ts:**
```typescript
import { Component } from '@angular/core';
import { Button, Card } from 'ui-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, Button, Card],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  };

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
```

**user-profile.component.html:**
```html
<div class="profile-container">
  <uilib-card variant="material" elevation="medium">
    <div card-header>
      <h2>User Profile</h2>
    </div>

    <div class="profile-content">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>

    <div card-footer>
      <uilib-button 
        variant="material" 
        color="primary" 
        size="small"
        (click)="toggleEdit()">
        {{ isEditing ? 'Save' : 'Edit' }}
      </uilib-button>
      <uilib-button 
        variant="minimal" 
        color="secondary" 
        size="small"
        *ngIf="isEditing"
        (click)="toggleEdit()">
        Cancel
      </uilib-button>
    </div>
  </uilib-card>
</div>
```

## Continuous Development Workflow

When actively developing the library and using it in another project:

1. **Watch mode for library:**
   ```bash
   cd ui-lib2/ui-lib2
   ng build ui-components --watch
   ```

2. **In your consuming project, use npm link:**
   ```bash
   npm link ui-components
   ```

3. **Run your application:**
   ```bash
   ng serve
   ```

Changes to the library will be automatically reflected in your application!

## Troubleshooting

### Issue: 403 Forbidden - Two-factor authentication required

**Error:**
```
npm error code E403
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/@yourname%2fpackage
npm error 403 Two-factor authentication or granular access token with bypass 2fa enabled is required
```

**Solution:**

1. **Recommended: Use Granular Access Token**
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Generate a new "Granular Access Token"
   - Make sure to check **"Bypass 2FA requirement"**
   - Configure npm to use it:
     ```bash
     npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
     ```

2. **Alternative: Enable 2FA and use OTP**
   - Enable 2FA at https://www.npmjs.com/settings/YOUR_USERNAME/twofa
   - Publish with OTP flag:
     ```bash
     npm publish --otp=123456
     ```

3. **Verify authentication:**
   ```bash
   npm whoami
   # Should display your username
   ```

### Issue: Package name already exists

**Error:**
```
npm error code E403
npm error 403 You do not have permission to publish "ui-components"
```

**Solution:** 
- Use a scoped package name: `@yourusername/ui-components`
- Update `package.json` in `projects/ui-components/package.json`:
  ```json
  {
    "name": "@yourusername/ui-components",
    "version": "1.0.0"
  }
  ```
- Publish with `--access public`:
  ```bash
  npm publish --access public
  ```

### Issue: Module not found

**Solution:** Make sure the paths are correctly configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "ui-components": ["./node_modules/ui-components"]
    }
  }
}
```

### Issue: Styles not applying

**Solution:** The library includes encapsulated styles. They should work automatically. If not, check that ViewEncapsulation is not being modified.

### Issue: Type errors

**Solution:** Make sure your TypeScript version is compatible:
```bash
npm install --save-dev typescript@latest
```

## Version Management

Update version in `projects/ui-components/package.json` before publishing:

```json
{
  "name": "ui-components",
  "version": "1.0.1",
  ...
}
```

Follow semantic versioning:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

## Best Practices

1. **Always build before publishing:**
   ```bash
   ng build ui-components --configuration production
   ```

2. **Test in demo app before publishing:**
   ```bash
   ng serve demo
   ```

3. **Document breaking changes** in CHANGELOG.md

4. **Tag releases** in Git:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Next Steps

- Add more components (Input, Select, Modal, etc.)
- Add unit tests
- Setup CI/CD for automated publishing
- Create a documentation website
- Add accessibility features (ARIA labels)
