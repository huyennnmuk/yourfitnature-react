
// A simple in-memory rate limiter. Not suitable for production at scale, but good for this context.

type RequestLog = { timestamp: number };

const ipRequestLog = new Map<string, RequestLog[]>();
const emailRequestLog = new Map<string, RequestLog[]>();

const IP_LIMIT = 10;
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const EMAIL_LIMIT = 3;
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day

const cleanUpLog = (log: Map<string, RequestLog[]>, key: string, windowMs: number) => {
    const now = Date.now();
    const entries = log.get(key) || [];
    const recentEntries = entries.filter(entry => now - entry.timestamp < windowMs);
    log.set(key, recentEntries);
};

export const checkRateLimit = (identifier: string, type: 'ip' | 'email'): boolean => {
    const isIp = type === 'ip';
    const log = isIp ? ipRequestLog : emailRequestLog;
    const limit = isIp ? IP_LIMIT : EMAIL_LIMIT;
    const windowMs = isIp ? IP_WINDOW_MS : EMAIL_WINDOW_MS;

    cleanUpLog(log, identifier, windowMs);

    const requests = log.get(identifier) || [];
    if (requests.length >= limit) {
        return false; // Limit exceeded
    }

    requests.push({ timestamp: Date.now() });
    log.set(identifier, requests);
    return true; // Limit not exceeded
};
