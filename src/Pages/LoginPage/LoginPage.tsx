import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useGoogleSignin from "../../Hooks/useGoogleSignin/useGoogleSignin";
import useAuth from "../../Hooks/useAuth/useAuth";

type Inputs = {
  enail: string;
  password: string;
};

const LoginPage = () => {
  const { setUserLoading, signinWithEmailPassword } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const googleSignin = useGoogleSignin();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    signinWithEmailPassword(data.enail, data.password)
      .then(() => {
        console.log("Login successful");
      })
      .catch(() => console.log("Something went wrong"))
      .finally(() => setUserLoading(false));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              {...register("enail", { required: true })}
              placeholder="Email"
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input"
              placeholder="Password"
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
          <div className="divider"></div>
          {googleSignin}
          <p className="text-xs text-center">
            Don't have an account? Register{" "}
            <Link className="text-primary" to={"/register"}>
              here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
