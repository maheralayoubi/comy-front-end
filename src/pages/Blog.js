import { useParams } from "react-router-dom";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BlogDetails from "../components/others/BlogDetails";

const Blog = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <BlogDetails id={id} />
      <Footer />
    </div>
  );
};

export default Blog;
