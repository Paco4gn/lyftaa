window.LIFTLAB_CONFIG = {
  // Firebase is the real backend for GitHub Pages/web:
  // 1. Create a Firebase project.
  // 2. Enable Authentication > Email/password.
  // 3. Enable Firestore Database.
  // 4. Enable Storage if you want progress/food photos.
  // 5. Replace these values with your Firebase web app config.
  firebase: {
    apiKey: "AIzaSyDzoVpQbygSRocISGJyJaSjrlgfJ_x_W9o",
    authDomain: "lyftaa-liftlab.firebaseapp.com",
    projectId: "lyftaa-liftlab",
    storageBucket: "lyftaa-liftlab.firebasestorage.app",
    messagingSenderId: "378122603344",
    appId: "1:378122603344:web:e4756d448259d37394ba55",
  },

  // Optional local/API fallback. Empty means "same origin", useful when `npm start`
  // serves frontend and API together.
  apiBaseUrl: "",
};
