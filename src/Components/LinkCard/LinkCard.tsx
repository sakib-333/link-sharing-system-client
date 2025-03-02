import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

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
  console.log(link);
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
            {link.visibility === "private" ? (
              <RiGitRepositoryPrivateFill />
            ) : (
              <MdPublic />
            )}
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
          <Link to={`/details/${link._id}`}>
            <button className="btn btn-primary bg-[#3f51bf]">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
