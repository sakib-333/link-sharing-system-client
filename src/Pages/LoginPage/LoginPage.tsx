import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useGoogleSignin from "../../Hooks/useGoogleSignin/useGoogleSignin";
import useAuth from "../../Hooks/useAuth/useAuth";
import { successAlert } from "../../Alerts/SuccessAlert/successAlert";
import { errorAlert } from "../../Alerts/ErrorAlert/errorAlert";

type Inputs = {
  enail: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserLoading, signinWithEmailPassword } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const googleSignin = useGoogleSignin();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    signinWithEmailPassword(data.enail, data.password)
      .then(() => {
        successAlert("Success", "Login successful");
        navigate("/");
      })
      .catch(() => errorAlert())
      .finally(() => setUserLoading(false));
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm w-full space-y-3"
      >
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
            type="password"
            {...register("password", { required: true })}
            className="input w-full"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-neutral w-full">
            Login
          </button>
        </div>
        <div className="divider"></div>
        <div className="w-full">{googleSignin}</div>
        <p className="text-xs text-center">
          Don't have an account? Register{" "}
          <Link className="text-primary" to={"/register"}>
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
