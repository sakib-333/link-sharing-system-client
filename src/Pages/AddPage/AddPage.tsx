import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  text: string;
  file: string;
  image: string;
};

const AddPage = () => {
  const [selOptn, setSelOptn] = useState<"text" | "image" | "file">("text");
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelOptn(e.target.value as "text" | "image" | "file");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm  space-y-3"
      >
        <div>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input w-full"
            placeholder="Title"
          />
        </div>
        <div>
          <select
            onChange={handleSelectOption}
            defaultValue="text"
            className="select w-full"
          >
            <option value={"text"}>Text</option>
            <option value={"image"}>Image</option>
            <option value={"file"}>File</option>
          </select>
        </div>
        <div>
          {selOptn === "text" && (
            <>
              <textarea
                {...register("text", { required: true })}
                className="textarea w-full"
                placeholder="Text..."
              ></textarea>
            </>
          )}
          {selOptn === "file" && (
            <>
              <input
                {...register("file", { required: true })}
                type="file"
                className="file-input w-full"
              />
            </>
          )}
          {selOptn === "image" && (
            <>
              <input
                {...register("image", { required: true })}
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                className="file-input w-full"
              />
            </>
          )}
        </div>

        <div>
          <button className="btn btn-neutral w-full">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
