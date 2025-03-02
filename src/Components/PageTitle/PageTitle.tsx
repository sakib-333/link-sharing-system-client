import { Helmet } from "react-helmet";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Helmet>
      <title>Link Sharing System | {title}</title>
    </Helmet>
  );
};

export default PageTitle;
