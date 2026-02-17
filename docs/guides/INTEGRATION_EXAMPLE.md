# Example: Using UI Components in Your Angular Project

This is a complete example showing how to integrate the ui-lib-custom library into your Angular application.

## Step-by-Step Integration Example

### 1. Setup (Choose One Method)

Use secondary entry points when importing components to keep bundles lean.

#### Option A: Using npm link (Best for local development)
```bash
# In the library directory (one-time setup)
cd D:\Work\Personal\Github\ui-lib-custom\dist\ui-lib-custom
npm link

# In your Angular project
cd /path/to/your/project
npm link ui-lib-custom
```

#### Option B: Using local file path
In your project's `package.json`:
```json
{
  "dependencies": {
    "@angular/animations": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0",
    "ui-lib-custom": "file:../ui-lib-custom/dist/ui-lib-custom"
  }
}
```

Then run:
```bash
npm install
```

### 2. Create a Component

```bash
ng generate component pages/dashboard
```

### 3. Component Implementation

**dashboard.component.ts:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Button, Card],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'inactive' }
  ];

  selectedUser: User | null = null;
  isLoading = false;

  selectUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      if (this.selectedUser?.id === user.id) {
        this.selectedUser = null;
      }
    }
  }

  addNewUser() {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.users.push({
        id: Date.now(),
        name: 'New User',
        email: 'newuser@example.com',
        role: 'User',
        status: 'active'
      });
      this.isLoading = false;
    }, 1000);
  }

  exportData() {
    console.log('Exporting data...', this.users);
    alert('Data exported successfully!');
  }

  refreshData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('Data refreshed!');
    }, 1000);
  }
}
```

**dashboard.component.html:**
```html
<div class="dashboard">
  <header class="dashboard-header">
    <h1>User Dashboard</h1>
    <p>Manage your users with style</p>
  </header>

  <!-- Action Bar -->
  <ui-lib-card variant="material" elevation="low">
    <div class="action-bar">
      <div class="button-group">
        <ui-lib-button 
          variant="material" 
          color="primary"
          [disabled]="isLoading"
          (click)="addNewUser()">
          {{ isLoading ? 'Adding...' : 'Add User' }}
        </ui-lib-button>
        
        <ui-lib-button 
          variant="bootstrap" 
          color="success"
          (click)="exportData()">
          Export
        </ui-lib-button>
        
        <ui-lib-button 
          variant="minimal" 
          color="secondary"
          (click)="refreshData()">
          Refresh
        </ui-lib-button>
      </div>
    </div>
  </ui-lib-card>

  <!-- User Grid -->
  <div class="user-grid">
    <!-- User Cards -->
    <div class="users-section">
      <h2>Users</h2>
      <div class="cards-container">
        @for (user of users; track user.id) {
          <ui-lib-card 
            variant="bootstrap"
            elevation="medium"
            [hoverable]="true"
            [class.selected]="selectedUser?.id === user.id"
            (click)="selectUser(user)">
            
            <div card-header>
              <div class="user-header">
                <span class="user-name">{{ user.name }}</span>
                <span 
                  class="status-badge" 
                  [class.active]="user.status === 'active'"
                  [class.inactive]="user.status === 'inactive'">
                  {{ user.status }}
                </span>
              </div>
            </div>

            <div class="user-info">
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Role:</strong> {{ user.role }}</p>
            </div>

            <div card-footer>
              <ui-lib-button 
                variant="bootstrap" 
                color="primary" 
                size="small"
                (click)="selectUser(user); $event.stopPropagation()">
                View
              </ui-lib-button>
              <ui-lib-button 
                variant="minimal" 
                color="danger" 
                size="small"
                (click)="deleteUser(user); $event.stopPropagation()">
                Delete
              </ui-lib-button>
            </div>
          </ui-lib-card>
        }
      </div>
    </div>

    <!-- User Details -->
    <div class="details-section">
      <h2>Details</h2>
      
      @if (selectedUser) {
        <ui-lib-card 
          variant="material"
          elevation="high">
          
          <div card-header>
            <h3>{{ selectedUser.name }}</h3>
          </div>

          <div class="detail-content">
            <div class="detail-row">
              <span class="label">User ID:</span>
              <span class="value">{{ selectedUser.id }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">{{ selectedUser.name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">{{ selectedUser.email }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Role:</span>
              <span class="value">{{ selectedUser.role }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value">
                <span 
                  class="status-badge" 
                  [class.active]="selectedUser.status === 'active'"
                  [class.inactive]="selectedUser.status === 'inactive'">
                  {{ selectedUser.status }}
                </span>
              </span>
            </div>
          </div>

          <div card-footer>
            <ui-lib-button 
              variant="material" 
              color="primary"
              [fullWidth]="true">
              Edit User
            </ui-lib-button>
            <ui-lib-button 
              variant="material" 
              color="danger"
              [fullWidth]="true"
              (click)="deleteUser(selectedUser)">
              Delete User
            </ui-lib-button>
          </div>
        </ui-lib-card>
      } @else {
        <div class="no-selection">
          <p>Select a user to see details.</p>
        </div>
      }
    </div>
  </div>

  <!-- Statistics Cards -->
  <div class="stats-grid">
    <ui-lib-card variant="material" elevation="medium">
      <div card-header>Total Users</div>
      <div class="stat-value">{{ users.length }}</div>
    </ui-lib-card>

    <ui-lib-card variant="material" elevation="medium">
      <div card-header>Active Users</div>
      <div class="stat-value">
        {{ (users | filter:'status':'active').length }}
      </div>
    </ui-lib-card>

    <ui-lib-card variant="material" elevation="medium">
      <div card-header>Inactive Users</div>
      <div class="stat-value">
        {{ (users | filter:'status':'inactive').length }}
      </div>
    </ui-lib-card>
  </div>
</div>
```

**dashboard.component.css:**
```css
.dashboard {
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 2.5rem;
}

.dashboard-header p {
  margin: 0;
  color: #666;
  font-size: 1.125rem;
}

.action-bar {
  padding: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.user-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.users-section h2,
.details-section h2 {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.5rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-name {
  font-weight: 600;
  font-size: 1.125rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #4caf50;
  color: white;
}

.status-badge.inactive {
  background: #f44336;
  color: white;
}

.user-info {
  margin: 1rem 0;
}

.user-info p {
  margin: 0.5rem 0;
}

.selected {
  border: 2px solid #1976d2 !important;
}

.detail-content {
  padding: 1rem 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  font-weight: 600;
  color: #666;
}

.detail-row .value {
  color: #333;
}

.no-selection {
  text-align: center;
  padding: 2rem;
  color: #999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  color: #1976d2;
  text-align: center;
  padding: 2rem 0;
}

@media (max-width: 968px) {
  .user-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard {
    padding: 1rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }
}
```

### 4. Add Route (if using routing)

**app.routes.ts:**
```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }
];
```

### 5. Run Your Application

```bash
ng serve
```

Visit http://localhost:4200 and you'll see your dashboard using the UI components library!

## Key Takeaways

1. **Import components** from 'ui-lib-custom'
2. **Add to imports array** in your component decorator
3. **Use in templates** with the `ui-lib-` prefix
4. **Customize** using input properties
5. **Handle events** with Angular event binding
6. **Style as needed** - components work with your CSS

## Tips

- Mix variants within the same application for visual hierarchy
- Use `[disabled]` bindings for loading states
- Leverage `[hoverable]` on cards for interactive elements
- Use `[fullWidth]` on buttons for mobile-friendly layouts
- Combine with your existing Angular Material or other UI libraries

## That's It!

You now have a working example showing the complete integration of your UI components library into an Angular application. The components work seamlessly with Angular's reactive patterns, event handling, and styling systems.
