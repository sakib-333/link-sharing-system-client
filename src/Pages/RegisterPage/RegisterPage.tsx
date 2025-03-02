import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useGoogleSignin from "../../Hooks/useGoogleSignin/useGoogleSignin";
import useAuth from "../../Hooks/useAuth/useAuth";
import { successAlert } from "../../Alerts/SuccessAlert/successAlert";
import { errorAlert } from "../../Alerts/ErrorAlert/errorAlert";

type Inputs = {
  displayName: string;
  enail: string;
  password: string;
  photoURL: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUserLoading, registerUserWithEmailPassword, updateUserProfile } =
    useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const googleSignin = useGoogleSignin();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    registerUserWithEmailPassword(data.enail, data.password)
      .then(() => updateUserProfile(data.displayName, data.photoURL))
      .then(() => {
        successAlert("Success", "Registration successful.");
        navigate("/");
      })
      .catch(() => errorAlert())
      .finally(() => setUserLoading(false));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-3"
      >
        <div>
          <input
            type="text"
            className="input w-full"
            {...register("displayName", { required: true })}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            type="email"
            className="input w-full"
            {...register("enail", { required: true })}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="text"
            className="input w-full"
            {...register("photoURL", { required: true })}
            placeholder="Photo URL"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input w-full"
            placeholder="Password"
          />
        </div>
        <div>
          <button className="btn btn-neutral w-full">Register</button>
        </div>
        <div className="divider"></div>
        <div className="w-full">{googleSignin}</div>
        <p className="text-xs text-center">
          Already have an account? Login{" "}
          <Link className="text-primary" to={"/login"}>
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
