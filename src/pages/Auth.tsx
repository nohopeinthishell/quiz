import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { loginWithGoogle } from "@/utils/auth";
import { useTranslation } from "react-i18next";

const Auth = () => {
    const { setUser } = useAuthStore();
    const { t } = useTranslation();

    const handleLogin = async () => {
        const user = await loginWithGoogle();
        setUser(user);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">{t("welcome")}</h1>
            <Button onClick={handleLogin}>{t("login")}</Button>
        </div>
    );
}

export default Auth;
