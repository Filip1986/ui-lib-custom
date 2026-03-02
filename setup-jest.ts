import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

HTMLElement.prototype.scrollIntoView = function scrollIntoView(): void {};
