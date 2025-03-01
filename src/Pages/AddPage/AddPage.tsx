import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useState } from "react";

type Inputs = {
  title: string;
  image: string;
  expire: string;
  visibility: string;
};

const AddPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    const expire = Number(data.expire);
    const api_key = import.meta.env.VITE_IMGBB_API_KEY;

    let url = `https://api.imgbb.com/1/upload?key=${api_key}`;

    if (expire) {
      url = `https://api.imgbb.com/1/upload?expiration=${expire}key=${api_key}`;
    }

    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const photoURL = res.data.data.url;

        const imageData = {
          author: user?.email,
          title: data.title,
          imageURL: photoURL,
          visibility: data.visibility,
        };

        axiosPublic
          .post("/upload-image", { ...imageData })
          .then(({ data }) => {
            console.log(data);
            reset();
          })
          .catch(() => console.log("Something went wrong."));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm  space-y-3"
      >
        <div>
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input w-full"
            placeholder="Title"
          />
        </div>
        <div>
          <label>Select image</label>
          <input
            {...register("image", { required: true })}
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            className="file-input w-full"
          />
        </div>
        <div>
          <label>Access control</label>
          <select
            defaultValue="private"
            {...register("visibility", { required: true })}
            className="select w-full"
          >
            <option value={"private"}>Private</option>
            <option value={"public"}>Public</option>
          </select>
        </div>
        <div>
          <label>Expires in</label>
          <select
            defaultValue="0"
            {...register("expire", { required: true })}
            className="select w-full"
          >
            <option value={"3600"}>1h</option>
            <option value={"7200"}>2h</option>
            <option value={"10800"}>3h</option>
            <option value={"0"}>Never</option>
          </select>
        </div>
        <div>
          {isLoading ? (
            <button className="btn btn-neutral w-full">
              <span className="loading loading-spinner"></span>
              Add
            </button>
          ) : (
            <button className="btn btn-neutral w-full">Add</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPage;
