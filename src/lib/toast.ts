import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning" | "promise";

export const showToast = (
  message: string,
  type: ToastType = "info",
  options: ToastOptions = {}
) => {
  (toast[type] as (message: string, options?: ToastOptions) => void)(message, {
    ...options,
  });
};
