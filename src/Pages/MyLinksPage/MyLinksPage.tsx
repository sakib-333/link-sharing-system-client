import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { FaEdit, FaUser } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { GiClick } from "react-icons/gi";
import { MdDelete, MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Link } from "react-router-dom";

type Link = {
  _id: string;
  author: string;
  title: string;
  imageURL: string;
  visibility: "public" | "private";
  totalAccess: number;
};

const MyLinksPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: myLinks = [], isLoading } = useQuery({
    queryKey: ["myLinks"],
    queryFn: async () => {
      const res = await axiosPublic.post("/my-links");
      if (res.data.acknowledgement) {
        return res.data.myLinks;
      } else {
        console.log("Something went wrong.");
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!myLinks.length) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="max-w-sm text-[#3f51bf] font-bold sm:text-xl md:text-2xl lg:text-3xl text-center">
          You have not added any image.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {myLinks.map((link: Link) => (
        <div className="card max-w-md w-full border rounded bg-base-100 card-sm shadow-sm">
          <div className="card-body">
            <h2 className="card-title truncate">{link.title}</h2>
            <p className="flex items-center gap-2">
              <span>
                <FaUser />
              </span>{" "}
              <span>{link.author}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <IoIosLink />
              </span>{" "}
              <span>{link.imageURL}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                {link.visibility === "private" ? (
                  <RiGitRepositoryPrivateFill />
                ) : (
                  <MdPublic />
                )}
              </span>{" "}
              <span>{link.visibility}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <GiClick />
              </span>{" "}
              <span>{link.totalAccess}</span>
            </p>

            <div className="justify-end card-actions">
              <Link to={`/edit/${link._id}`}>
                <button className="btn btn-primary bg-[#3f51bf]">
                  <FaEdit />
                </button>
              </Link>
              <button className="btn btn-primary bg-[#d86248]">
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyLinksPage;
