export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics Event] ${eventName}:`, params);
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  }
}
