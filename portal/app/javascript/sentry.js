import * as Sentry from '@sentry/browser';

(() => {
  const meta = document.querySelector('meta[name="isux:sentry-dsn"]');
  const environment = document.querySelector('meta[name="isux:environment"]');
  if (meta) {
    Sentry.init({
      dsn: meta.content,
      environment: environment ? environment.content : 'development'
    });
  }
})();
