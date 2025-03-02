import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import linkLogo from "/linkLogo.svg";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className=" bg-neutral text-neutral-content">
      <div className="footer sm:footer-horizontal  items-center p-4">
        <aside className="grid-flow-col items-center">
          <img src={linkLogo} alt="logo" /> <h1>Links</h1>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="https://github.com/sakib-333">
            <FaGithubSquare className="text-2xl hover:opacity-60 transition" />
          </a>
          <a href="https://github.com/sakib-333">
            <FaLinkedin className="text-2xl hover:opacity-60 transition" />
          </a>
          <a href="https://github.com/sakib-333">
            <FaFacebookSquare className="text-2xl hover:opacity-60 transition" />
          </a>
          <a href="https://github.com/sakib-333">
            <FaSquareXTwitter className="text-2xl hover:opacity-60 transition" />
          </a>
        </nav>
      </div>
      <p className="text-xs text-center">Copyright &copy; 2025</p>
    </footer>
  );
};

export default Footer;
