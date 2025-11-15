# Session Feedback App

A responsive single-page application (SPA) for IITM students to submit session feedback and collaborate through comments. Built with React and TailwindCSS, deployed on GitHub Pages.

> **⚠️ NOTICE: Firebase Integration Disabled**
> 
> Firebase integration has been disabled in this application. Authentication, database, and real-time features are currently unavailable. The application maintains its structure and UI for demonstration purposes.
> 
> To re-enable Firebase functionality, please refer to the git history and restore the Firebase configuration files.

## 🌟 Features

- **Dark/Light Mode** with localStorage persistence
- **Responsive Design** mobile-first using TailwindCSS
- **React Router** for navigation between pages
- **Modern UI Components** with Tailwind CSS

### Disabled Features (Firebase Required)
- ~~**Firebase Google Sign-In** with @iitm.ac.in domain restriction~~
- ~~**Real-time Feedback** submissions with ratings (1-5 stars)~~
- ~~**Interactive Comments** on feedback from authenticated users~~
- ~~**Admin Panel** with CSV export functionality~~
- ~~**Real-time Updates** using Firestore listeners~~
- ~~**Secure** with comprehensive Firestore security rules~~

## 🚀 Live Demo

Visit the app at: [https://23f2004837.github.io/SessionFeedbackApp](https://23f2004837.github.io/SessionFeedbackApp)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

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

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

> **Note:** Since Firebase is disabled, authentication and database features will not work. The app will only display the landing page.

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

> **Note:** Since Firebase is disabled, no Firebase-related secrets are required for deployment.

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

## 👨‍💼 Admin Access (Firebase Required - Currently Disabled)

Admin features are currently unavailable due to Firebase being disabled.

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors and theme settings.

### Firebase Rules (Disabled)

The `firestore.rules` file is preserved in the repository but is not currently in use since Firebase integration is disabled.

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

With Firebase disabled, the following security features are not currently active:
- ~~**Domain Restriction**: Only @iitm.ac.in emails can sign in~~
- ~~**Firestore Rules**: Comprehensive security rules validate all operations~~

The application maintains:
- **XSS Protection**: React's built-in sanitization for user inputs
- **Client-side Security**: No sensitive data is currently stored or transmitted

## 🐛 Troubleshooting

### Build Errors

- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher

### GitHub Pages Not Updating

- Check GitHub Actions workflow status in the Actions tab
- Ensure the `base` path in `vite.config.js` matches your repository name

### Re-enabling Firebase

To re-enable Firebase functionality:

1. Restore Firebase configuration from git history
2. Install the Firebase package: `npm install firebase`
3. Uncomment Firebase-related code in:
   - `src/firebase/firebaseConfig.js`
   - `src/firebase/firebaseHelpers.js`
   - `src/context/AuthContext.jsx`
4. Create a `.env` file with your Firebase credentials
5. Update the README to reflect Firebase features being active

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
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)

### Previously Used (Now Disabled)
- ~~[Firebase](https://firebase.google.com/) - Authentication and Database~~
