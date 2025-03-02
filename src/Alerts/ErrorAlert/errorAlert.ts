import Swal from "sweetalert2";

export const errorAlert = () => {
  Swal.fire({
    title: "Error",
    text: "Something went wrong",
    icon: "error",
  });
};
