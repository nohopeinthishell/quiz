import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LANGUAGES = [
    { code: "en", label: "🇺🇸" },
    { code: "ru", label: "🇷🇺" },
];

const Language = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const handleChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="fixed bottom-5 left-5">
            <Select value={currentLang} onValueChange={handleChange}>
                <SelectTrigger className=" rounded-full text-xl justify-center">
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    {LANGUAGES.map(({ code, label }) => (
                        <SelectItem key={code} value={code} className="justify-center">
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Language;
