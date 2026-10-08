import * as Sentry from '@sentry/node';

let isSentryEnabled = false;

export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  if (dsn && dsn.trim().length > 0) {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
      integrations: []
    });
    isSentryEnabled = true;
    console.log('[Sentry] Tracing initialized successfully');
  } else {
    console.log('[Sentry] SENTRY_DSN not provided — running in local telemetry mock mode');
  }
}

/**
 * Custom tracer wrapper for critical Re:Set agent workflows
 */
export async function traceSpan(name, op, fn, data = {}) {
  const start = Date.now();
  if (!isSentryEnabled) {
    try {
      const result = await fn();
      const duration = Date.now() - start;
      console.log(`[Trace] ${op}:${name} finished in ${duration}ms`, data);
      return result;
    } catch (err) {
      console.error(`[Trace Error] ${op}:${name}`, err);
      throw err;
    }
  }

  return Sentry.startSpan(
    {
      name,
      op,
      attributes: {
        ...data,
        environment: process.env.NODE_ENV || 'development'
      }
    },
    async (span) => {
      try {
        const result = await fn();
        span?.setStatus({ code: 1, message: 'ok' });
        return result;
      } catch (err) {
        span?.setStatus({ code: 2, message: err.message });
        Sentry.captureException(err, {
          extra: { spanName: name, op, ...data }
        });
        throw err;
      }
    }
  );
}

export function captureError(err, context = {}) {
  if (isSentryEnabled) {
    Sentry.captureException(err, { extra: context });
  } else {
    console.error('[Sentry Error Captured (Offline/Dev)]:', err.message, context);
  }
}

export { Sentry, isSentryEnabled };
