import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  enail: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);
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

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
