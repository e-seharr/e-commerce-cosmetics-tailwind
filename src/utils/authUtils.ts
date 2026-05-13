/* =========================================================
   AUTH UTILITIES
   Login and registration logic using localStorage.
   ========================================================= */

export interface User {
  name: string;
  email: string;
  password: string;
}

/** Validate signup form fields. Returns an error message string, or null if valid. */
export function validateSignupForm(name: string, email: string, password: string, confirm: string): string | null {
  if (!name || !email || !password || !confirm) return 'Please fill all fields';
  if (password !== confirm) return 'Passwords do not match';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

/** Register a new user. Returns an error string if email already exists, or null on success. */
export function registerUser(name: string, email: string, password: string): string | null {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) return 'Email already registered';
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return null;
}

/** Attempt login. Returns the matched User on success, or null on failure. */
export function loginUser(email: string, password: string): User | null {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedIn', JSON.stringify(user));
    return user;
  }
  return null;
}

/** Get the currently logged-in user from localStorage, or null if not logged in. */
export function getLoggedInUser(): User | null {
  const raw = localStorage.getItem('loggedIn');
  return raw ? JSON.parse(raw) : null;
}
