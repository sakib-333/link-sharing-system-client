import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import useAuth from "../../Hooks/useAuth/useAuth";

type Link = {
  _id: string;
  author: string;
  title: string;
  imageURL: string;
  visibility: "public" | "private";
  totalAccess: number;
};

interface LinkCardProps {
  link: Link;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShowDetails = (img: Link) => {
    if (!user && img.visibility === "private") {
      navigate("/login");
    } else {
      navigate(`/details/${img._id}`);
    }
  };

  return (
    <div className="card max-w-md w-full border rounded bg-base-100 card-sm shadow-sm hover:shadow-lg hover:scale-[1.01] transition">
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
            <GiClick />
          </span>{" "}
          <span>{link.totalAccess}</span>
        </p>
        <div className="justify-end card-actions">
          <button
            onClick={() => handleShowDetails(link)}
            className="btn btn-primary bg-[#3f51bf]"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
