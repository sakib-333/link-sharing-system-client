import Swal from "sweetalert2";

export const successAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
  });
};
