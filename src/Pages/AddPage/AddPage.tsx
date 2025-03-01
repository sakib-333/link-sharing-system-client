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
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 w-full max-w-sm shadow-2xl p-8 space-y-4"
      >
        <label className="fieldset-label">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="input"
          placeholder="Title"
        />
        <label className="fieldset-label">Select</label>
        <select
          onChange={handleSelectOption}
          defaultValue="text"
          className="select"
        >
          <option value={"text"}>Text</option>
          <option value={"image"}>Image</option>
          <option value={"file"}>File</option>
        </select>
        {selOptn === "text" && (
          <>
            <label className="fieldset-label">Text</label>
            <textarea
              {...register("text", { required: true })}
              className="textarea"
              placeholder="Text..."
            ></textarea>
          </>
        )}
        {selOptn === "file" && (
          <>
            <label className="fieldset-label">File</label>
            <input
              {...register("file", { required: true })}
              type="file"
              className="file-input"
            />
          </>
        )}
        {selOptn === "image" && (
          <>
            <label className="fieldset-label">Image</label>
            <input
              {...register("image", { required: true })}
              accept="image/png, image/jpg, image/jpeg"
              type="file"
              className="file-input"
            />
          </>
        )}
        <button className="btn btn-neutral mt-4 w-full">Add</button>
      </form>
    </div>
  );
};

export default AddPage;
