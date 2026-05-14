window.LIFTLAB_CONFIG = {
  // Firebase is the real backend for GitHub Pages/web:
  // 1. Create a Firebase project.
  // 2. Enable Authentication > Email/password.
  // 3. Enable Firestore Database.
  // 4. Enable Storage if you want progress/food photos.
  // 5. Replace these values with your Firebase web app config.
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },

  // Optional local/API fallback. Empty means "same origin", useful when `npm start`
  // serves frontend and API together.
  apiBaseUrl: "",
};
