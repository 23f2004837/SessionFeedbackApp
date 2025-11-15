// FIREBASE INTEGRATION DISABLED
// This file has been modified to provide stub implementations instead of Firebase calls.
// To re-enable Firebase, restore the original implementation from git history.

/*
 * ORIGINAL FIREBASE IMPLEMENTATION COMMENTED OUT BELOW
 * 
import {
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebaseConfig';

// Domain restriction constant
const ALLOWED_DOMAIN = '@iitm.ac.in';

// Authentication helpers
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if email has allowed domain
    if (!user.email.endsWith(ALLOWED_DOMAIN)) {
      await firebaseSignOut(auth);
      throw new Error(`Only ${ALLOWED_DOMAIN} email addresses are allowed.`);
    }

    // Create or update user document in Firestore
    await createOrUpdateUserDoc(user);

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Create or update user document on first sign-in
const createOrUpdateUserDoc = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // First time sign-in, create user document
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error creating/updating user document:', error);
    throw error;
  }
};

// Get user role
export const getUserRole = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data().role : 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
};

// Feedback CRUD operations
export const createFeedback = async (feedbackData) => {
  try {
    const feedbackRef = await addDoc(collection(db, 'feedbacks'), {
      ...feedbackData,
      createdAt: serverTimestamp(),
      likes: 0,
    });
    return feedbackRef.id;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

export const updateFeedback = async (feedbackId, updates) => {
  try {
    const feedbackRef = doc(db, 'feedbacks', feedbackId);
    await updateDoc(feedbackRef, updates);
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const feedbackRef = doc(db, 'feedbacks', feedbackId);
    await deleteDoc(feedbackRef);
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

// Get paginated feedbacks
export const getFeedbacks = async (pageSize = 10, lastDoc = null) => {
  try {
    let q = query(
      collection(db, 'feedbacks'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const feedbacks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      feedbacks,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === pageSize,
    };
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    throw error;
  }
};

// Real-time listener for feedbacks
export const subscribeFeedbacks = (callback, pageSize = 10) => {
  const q = query(
    collection(db, 'feedbacks'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  return onSnapshot(q, (snapshot) => {
    const feedbacks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(feedbacks);
  });
};

// Get single feedback
export const getFeedback = async (feedbackId) => {
  try {
    const feedbackRef = doc(db, 'feedbacks', feedbackId);
    const feedbackDoc = await getDoc(feedbackRef);
    
    if (feedbackDoc.exists()) {
      return {
        id: feedbackDoc.id,
        ...feedbackDoc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting feedback:', error);
    throw error;
  }
};

// Comment operations
export const addComment = async (feedbackId, commentData) => {
  try {
    const commentsRef = collection(db, 'feedbacks', feedbackId, 'comments');
    const commentRef = await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp(),
    });
    return commentRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Real-time listener for comments
export const subscribeComments = (feedbackId, callback) => {
  const q = query(
    collection(db, 'feedbacks', feedbackId, 'comments'),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
};

// Admin operations - Get all feedbacks for export
export const getAllFeedbacks = async () => {
  try {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const feedbacks = [];
    for (const doc of snapshot.docs) {
      const feedbackData = {
        id: doc.id,
        ...doc.data(),
      };
      
      // Get comments for this feedback
      const commentsSnapshot = await getDocs(
        collection(db, 'feedbacks', doc.id, 'comments')
      );
      feedbackData.comments = commentsSnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));
      
      feedbacks.push(feedbackData);
    }
    
    return feedbacks;
  } catch (error) {
    console.error('Error getting all feedbacks:', error);
    throw error;
  }
};
*/

// STUB IMPLEMENTATIONS - Firebase functionality disabled
// These are placeholder functions that prevent the app from crashing

// Authentication helpers
export const signInWithGoogle = async () => {
  throw new Error('Firebase authentication is currently disabled. Please contact the administrator.');
};

export const signOut = async () => {
  console.log('Sign out called (Firebase disabled)');
  return Promise.resolve();
};

// Get user role
export const getUserRole = async () => {
  return 'user';
};

// Feedback CRUD operations
export const createFeedback = async () => {
  throw new Error('Firebase is currently disabled. Feedback submission is not available.');
};

export const updateFeedback = async () => {
  throw new Error('Firebase is currently disabled. Feedback update is not available.');
};

export const deleteFeedback = async () => {
  throw new Error('Firebase is currently disabled. Feedback deletion is not available.');
};

// Get paginated feedbacks
export const getFeedbacks = async () => {
  return {
    feedbacks: [],
    lastDoc: null,
    hasMore: false,
  };
};

// Real-time listener for feedbacks
export const subscribeFeedbacks = (callback) => {
  // Return empty array immediately
  callback([]);
  // Return unsubscribe function
  return () => {};
};

// Get single feedback
export const getFeedback = async () => {
  return null;
};

// Comment operations
export const addComment = async () => {
  throw new Error('Firebase is currently disabled. Comment submission is not available.');
};

// Real-time listener for comments
export const subscribeComments = (feedbackId, callback) => {
  // Return empty array immediately
  callback([]);
  // Return unsubscribe function
  return () => {};
};

// Admin operations - Get all feedbacks for export
export const getAllFeedbacks = async () => {
  return [];
};
