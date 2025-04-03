import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import Loader from "@/components/Loader";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const setUser = useAuthStore((s) => s.setUser);
    const setIsAuthLoading = useAuthStore((s) => s.setIsAuthLoading);
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthLoading(false);
        });
        return () => unsub();
    }, []);

    if (isAuthLoading) return <Loader />;

    return <>{children}</>;
};

export default AuthProvider;
