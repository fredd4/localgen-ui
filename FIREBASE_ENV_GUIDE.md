# Managing Environment Variables with Firebase

This guide shows how to properly manage your API keys and Firebase configuration when deploying to Firebase Hosting.

## Local Development

1. Create a `.env.local` file in the project root with the following variables:

```
# OpenAI API Key (required for local development, not used in production)
VITE_OPENAI_API_KEY=your_openai_api_key

# Firebase configuration (optional, only needed if using analytics)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

The `.env.local` file is included in `.gitignore` and won't be committed to your repository.

## Important Security Note

**The OpenAI API key is intentionally NOT used in production builds.** When deployed, the application will:

1. Never read the OpenAI API key from environment variables
2. Require users to enter their own API keys through the web interface
3. Store user-provided API keys only in the user's browser (IndexedDB)

This design ensures that:
- Your development API key is never exposed in production
- Each user provides and manages their own API key
- API keys are never sent to any server (not even Firebase)

## Firebase Environment Variables with Runtime Config

For production deployment with Firebase, you only need to configure Firebase-specific settings:

1. Set Firebase configuration using environment variables during build:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key \
VITE_FIREBASE_PROJECT_ID=your-project-id \
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id \
npm run build
```

## Deploying with GitHub Actions

If using GitHub Actions for CI/CD, store only the Firebase configuration in your GitHub secrets:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
        env:
          # DO NOT include OPENAI_API_KEY here
          VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_MEASUREMENT_ID: ${{ secrets.FIREBASE_MEASUREMENT_ID }}
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```

## Security Best Practices

1. Never commit API keys or secret values to your Git repository
2. Use environment-specific settings for different environments (dev, staging, prod)
3. Restrict API keys in the Firebase console to specific domains/IPs
4. Always require users to provide their own OpenAI API keys in production 