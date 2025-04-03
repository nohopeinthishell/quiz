import { useAuthStore } from "@/store/authStore";
import { logout } from "@/utils/auth";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const Header = () => {
    const user = useAuthStore((s) => s.user);
    const { t } = useTranslation();

    return (
        user && (
            <header className="fixed left-0 right-0 w-full flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
                <h1 className="text-xl font-bold text-nowrap">🔥 Quiz App</h1>

                <div className="flex items-center gap-4">
                    <img src={user.photoURL || ""} alt="avatar" className="w-8 h-8 rounded-full " />
                    <span className="text-sm hidden md:block">{user.displayName}</span>
                    <Button onClick={logout}>{t("logout")}</Button>
                </div>
            </header>
        )
    );
};

export default Header;
