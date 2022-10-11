import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { toast } from 'react-hot-toast';

interface IAuth {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
};

const AuthContext = createContext<IAuth>({
  user: null,
  loading: false,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface FormData {
  username: string;
  email: string;
  timestamp: number;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    timestamp: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
      }

      setInitialLoad(false);
    });
  }, [auth]);

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          updateProfile(auth.currentUser!, {
            displayName: username,
          });

          const formDataCopy = { ...formData };
          formDataCopy.username = username;
          formDataCopy.email = email;
          formDataCopy.timestamp = Date.now();

          const persistUser = async () => {
            await setDoc(doc(db, 'users', user.uid), formDataCopy);
          };

          persistUser();
        }

        router.push('/');
        setLoading(false);
      })
      .catch((error) => {
        toast(`Something went wrong. Please try again. ${error.message}`, {
          duration: 5000,
          style: toastStyle,
        });
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
        setLoading(false);
      })
      .catch((error) => {
        toast(`Something went wrong. Please try again. ${error.message}`, {
          duration: 5000,
          style: toastStyle,
        });
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        toast(`Logout failed. Please try again.`, {
          duration: 5000,
          style: toastStyle,
        });
      })
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signUp,
      signIn,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoad && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
