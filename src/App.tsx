import AuthProvider from "./AppProvider";
import AppRoutes from "./AppRoutes";
import "@/utils/i18n";

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
