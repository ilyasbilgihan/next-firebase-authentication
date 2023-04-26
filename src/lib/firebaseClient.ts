import { initializeApp } from "firebase/app";

import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const apiKey = process.env["NEXT_PUBLIC_API_KEY"];
const appId = process.env["NEXT_PUBLIC_APP_ID"];
const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"];

if (!apiKey || !appId || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  );
}

const firebaseConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence);

export { auth };
