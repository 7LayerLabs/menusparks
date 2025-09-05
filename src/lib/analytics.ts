// Analytics tracking helper
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', eventName, properties)
  }
  
  // Google Analytics (if configured)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Track Event:', eventName, properties)
  }
}