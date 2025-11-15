import { createContext, useContext, useEffect, useState } from 'react';
// FIREBASE DISABLED - Original Firebase imports commented out
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig';
// import { getUserRole } from '../firebase/firebaseHelpers';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // FIREBASE DISABLED - Without Firebase, user is always null and loading is always false
  const [currentUser] = useState(null);
  const [userRole] = useState('user');
  const [loading] = useState(false);

  useEffect(() => {
    // FIREBASE DISABLED - Original Firebase auth listener commented out
    /*
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user role
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserRole('user');
      }
      
      setLoading(false);
    });

    return unsubscribe;
    */
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
