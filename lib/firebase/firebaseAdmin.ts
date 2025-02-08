import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY as string);

const firebaseAdminConfig = {
  credential: admin.credential.cert(serviceAccount),
};

if (!getApps().length) {
  admin.initializeApp(firebaseAdminConfig);
}

const auth = admin.auth();

const adminDb = admin.firestore();

export { adminDb, auth };
 