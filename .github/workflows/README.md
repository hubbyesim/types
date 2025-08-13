# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the `@hubbyesim/types` package.

## Workflows

### Build, Commit Dist, and Tag Version

**File:** `build-and-commit.yml`

This workflow automatically builds the TypeScript package, runs tests, and creates releases when changes are pushed to the `main` branch.

**Triggers:**
- **Push to main branch**: Runs tests, builds, commits dist files, creates tags and releases
- **Pull request to main branch**: Runs tests and builds (verification only, no commits/releases)

#### What it does:

1. **Test Job** (runs first):
   - Sets up Node.js environment with npm caching
   - Installs dependencies including Firebase Admin SDK
   - Sets up Firebase authentication using service account
   - Runs all tests with Firebase instance injection
   - Provides detailed error reporting and verification

2. **Build Job** (runs after tests pass on push to main):
   - Builds the TypeScript package using `tsup`
   - Commits compiled `dist/` files if changes exist
   - Creates new version tags automatically
   - Publishes GitHub releases

3. **PR Build Job** (runs after tests pass on pull requests):
   - Builds the TypeScript package using `tsup`
   - Verifies build output without committing changes
   - Provides build verification for code review

#### Required Secrets

To run tests with Firebase, you need to set up the following secret in your repository:

**`FIREBASE_SERVICE_ACCOUNT_TEST_ENCODED`**

This should be a base64-encoded Firebase service account JSON file for testing purposes.

##### How to set up:

1. **Create a Firebase Service Account:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a test project)
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file

2. **Encode the service account:**
   ```bash
   base64 -i path/to/serviceAccountKey.json
   ```

3. **Add to GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT_TEST_ENCODED`
   - Value: Paste the base64-encoded string from step 2

#### Test Configuration

The workflow automatically:
- Uses the service account credentials when available
- Falls back to application default credentials for local development
- Sets appropriate environment variables (`NODE_ENV=test`, `CI=true`)
- Provides detailed logging and error reporting
- Times out after 10 minutes to prevent hanging

#### Local Testing

For local development, you can run tests without setting up the secret:

```bash
npm test
```

The test setup will automatically use your local Firebase configuration or application default credentials.

#### Firebase Project

The workflow uses `hubby-esim-dev` as the default Firebase project for testing. You can change this by modifying the `FIREBASE_PROJECT_ID` environment variable in the workflow file.

## Dependencies

- Node.js 20+
- npm
- Firebase Admin SDK 12.2.0+
- Firebase CLI (for service account setup)
- jq (for JSON parsing in verification steps)

## Troubleshooting

### Tests failing in CI

1. **Check the service account secret:**
   - Verify `FIREBASE_SERVICE_ACCOUNT_TEST_ENCODED` is set correctly
   - Ensure the service account has appropriate permissions
   - Check that the project ID matches your Firebase project

2. **Firebase connection issues:**
   - Verify the service account JSON is valid
   - Check that the project ID in the service account matches `FIREBASE_PROJECT_ID`
   - Ensure the service account has access to Firestore

3. **Timeout issues:**
   - Tests timeout after 10 minutes
   - Build job times out after 15 minutes
   - Check for hanging Firebase operations in your tests

### Local vs CI differences

- **Local:** Uses application default credentials or local Firebase config
- **CI:** Uses service account credentials from GitHub secrets
- **Environment:** CI sets `NODE_ENV=test` and `CI=true`

## Security Notes

- The service account secret is only used during test execution
- Credentials are not persisted between workflow runs
- Service account files are created temporarily and cleaned up automatically
- Use a dedicated test service account with minimal permissions
