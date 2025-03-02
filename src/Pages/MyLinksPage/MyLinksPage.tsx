import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import LinkCard from "../../Components/LinkCard/LinkCard";

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

  return (
    <div>
      <LinkCard />
    </div>
  );
};

export default MyLinksPage;
