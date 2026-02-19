# Bundle Size Tracking

## Manual Check
```powershell
ng build ui-lib-custom
.\scripts\analyze-bundle.ps1
```

## CI Integration (GitHub Actions Example)
```yaml
- name: Build Library
  run: ng build ui-lib-custom

- name: Check Bundle Size
  run: |
    # Add size check logic
    # Fail if exceeds threshold
```

## Size Budgets

| Component | Max Size | Current |
| --- | --- | --- |
| Button | 5 KB | X KB |
| Card | 3 KB | X KB |
| Full Library | 100 KB | X KB |

