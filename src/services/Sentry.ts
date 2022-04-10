import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

interface InitializationData {
  token: string;
  user: string;
}

function SentryInitialization() {
  return Sentry.init({
    environment: 'development',
    dsn: `${process.env.REACT_APP_SENTRY}`,
    integrations: [new BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function SentrySetUser({ user, token }: InitializationData) {
  Sentry.configureScope(scope => {
    scope.setTag('profile', 'provider');
    scope.setUser({
      email: `${user}`,
      token,
    });
  });
}

function SentryReset() {
  Sentry.configureScope(scope => scope.setUser(null));
}

export { SentrySetUser, SentryInitialization, SentryReset };
