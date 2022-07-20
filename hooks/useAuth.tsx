// react
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// firebase
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

// next
import { useRouter } from "next/router";

// interfaces
interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/auth/sign-in");
      }
      setInitialLoading(false);
    });
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((e) => {
        alert(e.message);
        setError(e.message);
      })
      .finally(() => setLoading(true));
  };

  const memorizedValue = useMemo(
    () => ({ user, loading, signIn, signUp, logout, error }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memorizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
