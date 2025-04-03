import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";
import Header from "@/components/Header";

import { useAuthStore } from "@/store/authStore";
import Language from "@/components/Language";

const AppRoutes = () => {
    const user = useAuthStore((s) => s.user);
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {!user ? (
                    <Route
                        path="*"
                        element={
                            <FadeIn>
                                <Auth />
                                <Language />
                            </FadeIn>
                        }
                    />
                ) : (
                    <>
                        <Route
                            path="/"
                            element={
                                <FadeIn>
                                    <Header />
                                    <Language />
                                    <Home />
                                </FadeIn>
                            }
                        />
                        <Route
                            path="/quiz"
                            element={
                                <FadeIn>
                                    <Quiz />
                                </FadeIn>
                            }
                        />
                        <Route
                            path="/result"
                            element={
                                <FadeIn>
                                    <Header />
                                    <Result />
                                </FadeIn>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
