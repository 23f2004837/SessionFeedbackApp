# Session Feedback App

A responsive single-page application (SPA) for IITM students to submit session feedback and collaborate through comments. Built with React, Firebase, and TailwindCSS, deployed on GitHub Pages.

## 🌟 Features

- **Firebase Google Sign-In** with @iitm.ac.in domain restriction
- **Real-time Feedback** submissions with ratings (1-5 stars)
- **Interactive Comments** on feedback from authenticated users
- **Dark/Light Mode** with localStorage persistence
- **Admin Panel** with CSV export functionality
- **Responsive Design** mobile-first using TailwindCSS
- **Real-time Updates** using Firestore listeners
- **Secure** with comprehensive Firestore security rules

## 🚀 Live Demo

Visit the app at: [https://23f2004837.github.io/SessionFeedbackApp](https://23f2004837.github.io/SessionFeedbackApp)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase account
- A Google Cloud project (for Firebase)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/23f2004837/SessionFeedbackApp.git
cd SessionFeedbackApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Project Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Name your project (e.g., "session-feedback-app")

#### Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** as a sign-in provider
3. Add `@iitm.ac.in` to authorized domains if needed

#### Set Up Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click "Create database"
3. Start in **production mode** or **test mode** (you'll add rules later)
4. Choose a location for your database

#### Deploy Firestore Security Rules

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your Firebase project
   - Keep the default `firestore.rules` filename
   - Keep the default `firestore.indexes.json` filename

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

#### Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

#### Setup GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

#### Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. The workflow will automatically deploy on the next push to `main`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
npx gh-pages -d dist
```

## 👨‍💼 Admin Access

### Granting Admin Role

To grant admin privileges to a user:

1. Sign in to Firebase Console
2. Go to **Firestore Database**
3. Navigate to `users` collection
4. Find the user document (by UID)
5. Edit the document and change `role` from `"user"` to `"admin"`

Alternatively, create a Cloud Function to automate this process.

### Admin Features

Admins can:
- Access the Admin Panel from the header
- Export all feedback and comments as CSV
- View system statistics (future enhancement)

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors and theme settings.

### Firebase Rules

The `firestore.rules` file contains security rules. Key features:
- Only @iitm.ac.in users can access
- Users can only edit/delete their own feedback and comments
- Validates field constraints (rating 1-5, character limits)
- Admins have elevated permissions

## 🗂️ Project Structure

```
SessionFeedbackApp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                      # Static assets
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ErrorMessage.jsx
│   │   ├── Header.jsx
│   │   └── Loading.jsx
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── firebase/                # Firebase configuration & helpers
│   │   ├── firebaseConfig.js
│   │   └── firebaseHelpers.js
│   ├── pages/                   # Page components
│   │   ├── Admin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FeedbackDetail.jsx
│   │   ├── Landing.jsx
│   │   └── SubmitFeedback.jsx
│   ├── utils/                   # Utility functions
│   │   └── csvExport.js
│   ├── App.jsx                  # Main app component with routing
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.jsx                # App entry point
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── firestore.rules              # Firestore security rules
├── package.json                 # Dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

## 🔒 Security

- **Domain Restriction**: Only @iitm.ac.in emails can sign in (enforced client-side and in Firestore rules)
- **Character Limits**: 
  - Feedback comments: 2000 characters max
  - Suggestions: 2000 characters max
  - Comments: 1000 characters max
- **Firestore Rules**: Comprehensive security rules validate all operations
- **XSS Protection**: User inputs are sanitized and displayed safely

## 🐛 Troubleshooting

### Firebase Authentication Error

- Ensure Google Sign-In is enabled in Firebase Console
- Verify Firebase configuration in `.env` file
- Check that your domain is authorized in Firebase Authentication settings

### Firestore Permission Denied

- Deploy the latest `firestore.rules` using Firebase CLI
- Ensure you're signed in with an @iitm.ac.in email
- Check browser console for detailed error messages

### Build Errors

- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher
- Check that all environment variables are properly set

### GitHub Pages Not Updating

- Check GitHub Actions workflow status in the Actions tab
- Verify all secrets are properly configured in GitHub repository settings
- Ensure the `base` path in `vite.config.js` matches your repository name

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/23f2004837/SessionFeedbackApp/issues).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Firebase](https://firebase.google.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)
