import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJ21rDq5jKpUJ1r1Ozi2VZylIbKn48lVY',
  authDomain: 'basicproject5team.firebaseapp.com',
  projectId: 'basicproject5team',
  storageBucket: 'basicproject5team.appspot.com',
  messagingSenderId: '836632878912',
  appId: '1:836632878912:web:ce3c941bb31ffecc12e4a5',
  measurementId: 'G-CR2C67YBN0',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
