import { useQuery } from "@tanstack/react-query";
import LinkCard from "../../Components/LinkCard/LinkCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

type Link = {
  _id: string;
  author: string;
  title: string;
  imageURL: string;
  visibility: "public" | "private";
  totalAccess: number;
};

const HomePage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allLinks = [] } = useQuery({
    queryKey: ["allLinks"],
    queryFn: async () => {
      const result = await axiosPublic.get("/all-links");
      if (result.data.acknowledgement) {
        return result.data.allLinks;
      } else {
        console.log("Something went wrong");
      }
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {allLinks.map((link: Link) => (
        <LinkCard key={link._id} link={link} />
      ))}
    </div>
  );
};

export default HomePage;
