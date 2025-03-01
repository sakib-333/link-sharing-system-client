import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useGoogleSignin from "../../Hooks/useGoogleSignin/useGoogleSignin";
import useAuth from "../../Hooks/useAuth/useAuth";

type Inputs = {
  displayName: string;
  enail: string;
  password: string;
  photoURL: string;
};

const RegisterPage = () => {
  const { setUserLoading, registerUserWithEmailPassword, updateUserProfile } =
    useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const googleSignin = useGoogleSignin();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    registerUserWithEmailPassword(data.enail, data.password)
      .then(() => updateUserProfile(data.displayName, data.photoURL))
      .then(() => {
        console.log("Registration successful.");
      })
      .catch(() => console.log("Something went wrong"))
      .finally(() => setUserLoading(false));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 w-full max-w-sm shadow-2xl"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="fieldset-label">Full Name</label>
            <input
              type="text"
              className="input"
              {...register("displayName", { required: true })}
              placeholder="Full Name"
            />
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              {...register("enail", { required: true })}
              placeholder="Email"
            />
            <label className="fieldset-label">Photo URL</label>
            <input
              type="text"
              className="input"
              {...register("photoURL", { required: true })}
              placeholder="Photo URL"
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <div className="divider"></div>
          {googleSignin}
          <p className="text-xs text-center">
            Already have an account? Login{" "}
            <Link className="text-primary" to={"/login"}>
              here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
