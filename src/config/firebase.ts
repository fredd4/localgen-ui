// This file sets up the Firebase configuration
// The actual values should be provided in .env.local which is git-ignored

// Type definition for Firebase config
interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  measurementId?: string;
}

// Get config from environment variables
export const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Function to validate if Firebase is properly configured
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId
  );
}; 