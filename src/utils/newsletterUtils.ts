/* =========================================================
   NEWSLETTER UTILITIES
   Subscription validation used by the Home page.
   ========================================================= */

/** Validate newsletter email. Returns an error message string, or null if valid. */
export function validateSubscription(email: string): string | null {
  if (!email || !email.trim()) return 'Please enter your email';
  return null;
}
