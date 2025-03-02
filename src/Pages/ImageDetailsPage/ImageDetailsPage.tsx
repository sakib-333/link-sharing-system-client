import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { GiClick } from "react-icons/gi";

const ImageDetailsPage = () => {
  const [copy, setCopy] = useState<"Copy" | "Copied">("Copy");
  const id = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: image = {}, isLoading } = useQuery({
    queryKey: ["imageDetails"],
    queryFn: async () => {
      const result = await axiosPublic.post("/get-image", { ...id });
      if (result.data.acknowledgement) {
        return result.data.image;
      } else {
        console.log("Something went wrong");
      }
    },
  });

  const handleCopy = () => {
    const timerID = setTimeout(() => {
      setCopy("Copy");
    }, 2000);

    setCopy("Copied");

    return () => clearTimeout(timerID);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 max-w-96 w-full shadow-md">
        <figure>
          <img src={image.imageURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{image.title}</h2>
          <p className="flex items-center gap-2">
            <span>
              <FaUser />
            </span>{" "}
            <span>{image.author}</span>
          </p>
          <div className="flex items-center gap-2">
            <span>
              <IoIosLink />
            </span>
            <p>{image.imageURL}</p>
            <button onClick={handleCopy}>{copy}</button>
          </div>
          <p className="flex items-center gap-2">
            <span>
              <GiClick />
            </span>{" "}
            <span>{image.totalAccess}</span>
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailsPage;
