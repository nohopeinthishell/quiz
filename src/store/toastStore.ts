import { create } from "zustand";
import { toast } from "sonner";

interface ToastStateI {
    notify: (msg: string, opts?: { description?: string; type?: "success" | "error" }) => void;
}

export const useToastStore = create<ToastState>()(() => ({
    notify: (msg, opts) => {
        switch (opts?.type) {
            case "error":
                toast.error(msg, { description: opts.description });
                break;
            case "success":
                toast.success(msg, { description: opts.description });
                break;
            default:
                toast(msg, { description: opts?.description });
                break;
        }
    },
}));
