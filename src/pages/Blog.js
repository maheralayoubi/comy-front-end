import { useParams } from "react-router-dom";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import Blog from "../components/Blog";

const Login = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <Blog id={id} />
      <Footer />
    </div>
  );
};

export default Login;
