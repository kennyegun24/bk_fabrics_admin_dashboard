import { toast } from "sonner";

export const toastSuccess = (message) => {
  return toast.success(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "red",
    bodyStyle: {
      color: "var(--text_color)",
      background: "transparent",
      fontSize: "12px",
    },
  });
};

export const toastError = (message) => {
  return toast.error(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "red",
    bodyStyle: {
      color: "var(--text_color)",
      background: "transparent",
      fontSize: "12px",
    },
  });
};
