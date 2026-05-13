/* =========================================================
   CONTACT UTILITIES
   Form validation and submission logic for the Contact page.
   ========================================================= */

export interface ContactFormData {
  cfname: string;
  clname: string;
  cemail: string;
  cmessage: string;
}

/** Validate contact form fields. Returns an error message string, or null if valid. */
export function validateContactForm(form: ContactFormData): string | null {
  if (!form.cfname || !form.cemail || !form.cmessage) {
    return 'Please fill required fields';
  }
  return null;
}
