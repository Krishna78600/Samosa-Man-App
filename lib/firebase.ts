import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Firestore,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: any;
let auth: Auth;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Types
interface MealRecord {
  employeeId: string;
  mealType: 'MORNING' | 'EVENING';
  counterId: number;
  timestamp: number;
  date: string;
}

interface CheckResult {
  exists: boolean;
  error?: string;
  mealType?: string;
  counterId?: number;
}

interface SaveResult {
  success: boolean;
  error?: string;
}

// Functions
export const checkEmployeeExists = async (employeeId: string): Promise<CheckResult> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const mealCollection = collection(db, 'meals');
    const q = query(
      mealCollection,
      where('employeeId', '==', employeeId),
      where('date', '==', today)
    );

    const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (snapshot.empty) {
      return { exists: false };
    }

    const meal = snapshot.docs[0].data() as MealRecord;
    return {
      exists: true,
      mealType: meal.mealType,
      counterId: meal.counterId,
    };
  } catch (error: any) {
    return {
      exists: false,
      error: error.message || 'Error checking employee',
    };
  }
};

export const saveMealRecord = async (
  employeeId: string,
  mealType: 'MORNING' | 'EVENING',
  counterId: number
): Promise<SaveResult> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const mealCollection = collection(db, 'meals');

    const meal: MealRecord = {
      employeeId,
      mealType,
      counterId,
      timestamp: Date.now(),
      date: today,
    };

    const docRef = await addDoc(mealCollection, meal);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error saving meal record',
    };
  }
};

export const getTodayMeals = async (): Promise<MealRecord[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const mealCollection = collection(db, 'meals');
    const q = query(mealCollection, where('date', '==', today));

    const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as MealRecord);
  } catch (error) {
    console.error('Error getting today meals:', error);
    return [];
  }
};

export const getEmployeeHistory = async (employeeId: string): Promise<MealRecord[]> => {
  try {
    const mealCollection = collection(db, 'meals');
    const q = query(mealCollection, where('employeeId', '==', employeeId));

    const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as MealRecord);
  } catch (error) {
    console.error('Error getting employee history:', error);
    return [];
  }
};

export { auth, db, app };          