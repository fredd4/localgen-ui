import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig, isFirebaseConfigured } from '@/config/firebase';

// Initialize Firebase only if properly configured
let app;
let analytics;

try {
  if (isFirebaseConfigured()) {
    // For Firebase hosting with analytics, we only need minimal config
    app = initializeApp({
      apiKey: firebaseConfig.apiKey,
      projectId: firebaseConfig.projectId,
      // These are required by Firebase SDK but can be empty for just hosting+analytics
      authDomain: `${firebaseConfig.projectId}.firebaseapp.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
      messagingSenderId: "000000000000", // placeholder, not used
      appId: "1:000000000000:web:0000000000000000000000", // placeholder, not used
      measurementId: firebaseConfig.measurementId
    });
    
    // Only initialize analytics in browser environment
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } else {
      console.log('Firebase initialized without Analytics');
    }
  } else {
    console.log('Firebase not configured - hosting only mode');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { app, analytics }; 