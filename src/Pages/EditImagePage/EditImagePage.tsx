import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { errorAlert } from "../../Alerts/ErrorAlert/errorAlert";
import { successAlert } from "../../Alerts/SuccessAlert/successAlert";

type Inputs = {
  title: string;
  visibility: string;
};
const EditImagePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPublic = useAxiosPublic();
  const {
    data: image = {},
    isLoading: isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getImage"],
    queryFn: async () => {
      const result = await axiosPublic.post("/fetch-image", { id });
      if (result.data.acknowledgement) {
        return result.data.image;
      } else {
        console.log("Something went wrong");
      }
    },
  });

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);

    const newData = {
      id,
      imageData: {
        title: data.title,
        visibility: data.visibility,
      },
    };

    axiosPublic
      .post("/update-info", { ...newData })
      .then(({ data }) => {
        successAlert("Updated", data.message);
        refetch();
      })
      .catch(() => errorAlert())
      .finally(() => setIsLoading(false));
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

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
            defaultValue={image.title}
          />
        </div>
        <div>
          <label>Link</label>
          <input
            type="text"
            defaultValue={image.imageURL}
            readOnly
            className="input w-full"
            placeholder="Title"
          />
        </div>
        <div>
          <label>Access control</label>
          <select
            defaultValue={image.visibility}
            {...register("visibility", { required: true })}
            className="select w-full"
          >
            <option value={"private"}>Private</option>
            <option value={"public"}>Public</option>
          </select>
        </div>
        <div>
          {isLoading ? (
            <button className="btn btn-neutral w-full">
              <span className="loading loading-spinner"></span>
              Add
            </button>
          ) : (
            <button className="btn btn-neutral w-full">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditImagePage;
