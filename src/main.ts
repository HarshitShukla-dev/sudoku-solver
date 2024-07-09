import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

import 'mdui/mdui.css';
import 'mdui';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

setColorScheme('#234ffa');