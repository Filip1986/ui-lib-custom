import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(err.message, err);
    return;
  }
  console.error(err);
});
