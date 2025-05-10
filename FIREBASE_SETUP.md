# Firebase Hosting Setup

This document explains how to set up and deploy this project to Firebase Hosting while keeping your API keys and configuration secure.

## Prerequisites

1. [Create a Firebase project](https://console.firebase.google.com/)
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login to Firebase: `firebase login`

## Configuration Steps

### 1. Create and Configure .firebaserc (Not in Git)

The `.firebaserc` file contains your Firebase project ID and should not be committed to Git.

1. Copy the example file:
```bash
cp .firebaserc.example .firebaserc
```

2. Edit your local `.firebaserc` file and replace `YOUR-FIREBASE-PROJECT-ID` with your actual Firebase project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

Note: `.firebaserc` is already included in `.gitignore` to prevent accidentally committing it.

### 2. Create `.env.local` file for Local Development Only

Create a `.env.local` file in the root directory with your required configuration:

```
# OpenAI API Key (required for local development, not used in production)
VITE_OPENAI_API_KEY=your_openai_api_key

# Firebase configuration (optional, only needed if using analytics)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important Notes:** 
- The `.env.local` file is included in `.gitignore` and will NOT be committed to your Git repository.
- For the production/Firebase deployment, the app is designed to NOT use the OpenAI API key from environment variables. Instead, users will enter their own API keys through the web interface.
- Only the Firebase configuration is used in the production build.

### 3. Build and Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
npm run firebase:deploy
```

## Environment Variables in CI/CD

If you're using CI/CD pipelines (like GitHub Actions), you'll need to add the Firebase configuration variables to your secrets in the CI platform, but you should **NOT** include the OpenAI API key since it won't be used in production.

For CI/CD deployments, you'll also need to generate the `.firebaserc` file during the build process:

```yaml
# Example GitHub Actions workflow step
- name: Create Firebase config
  run: |
    echo '{
      "projects": {
        "default": "${{ secrets.FIREBASE_PROJECT_ID }}"
      }
    }' > .firebaserc
```

## Firebase Hosting Features

The configuration in `firebase.json` includes:

- SPA routing (all routes directed to index.html)
- Caching for static assets
- Proper handling of different file types

## Note on Firebase Services

This setup focuses primarily on Firebase Hosting. If you need to use additional Firebase services (like Firestore, Storage, or Authentication), you'll need to add the appropriate configuration parameters and update the initialization code. 