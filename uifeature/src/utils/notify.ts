import { toast } from "react-toastify";

export const notify = (message: string, type: "success" | "error") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
  });
};
