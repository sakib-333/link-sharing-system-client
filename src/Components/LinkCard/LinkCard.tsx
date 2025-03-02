import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { GiClick } from "react-icons/gi";

const LinkCard = () => {
  return (
    <div className="card max-w-96 w-full border rounded bg-base-100 card-sm shadow-sm hover:shadow-lg hover:scale-[1.01] transition">
      <div className="card-body">
        <h2 className="card-title">Small Card</h2>
        <p className="flex items-center gap-2">
          <span>
            <FaUser />
          </span>{" "}
          <span>moeen@gmail.com</span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <MdPublic />
          </span>{" "}
          <span>https://i.ibb.co/nsBM7KQ6/241112.jpg</span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            <GiClick />
          </span>{" "}
          <span>0</span>
        </p>
        <div className="justify-end card-actions">
          <Link to={"/"}>
            <button className="btn btn-primary bg-[#3f51bf]">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
