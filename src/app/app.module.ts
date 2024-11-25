import { SentryModule } from '@sentry/angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    SentryModule.forRoot({ dsn: 'https://your-sentry-dsn@sentry.io/123456' }),
    // otros imports
  ],
})
export class AppModule {}
