import { Link } from "react-router-dom";
import blogs from "../data/blogs.json";
import "./styles/Blog.scss";

const Blog = ({ id }) => {
  const blog = blogs.find((item) => item.id === id);

  return (
    <div className="blog">
      <div className="blogContainer">
        <div className="blogTitle">
          <Link className="back" to="/">ホーム
            <img src="/images/arrow_forward_ios.png" alt="arrow" />
          </Link>
          <h6 className="shortTitle">
            {blog.shortTitle}
          </h6>
        </div>
        <img className="blogImg" src={blog.image} alt={blog.title} />
        {/* <div className="blogImg"></div> */}
        <div className="data">
          <div className="container">
            <span className="date">{blog.date}</span>
            <h1 className="title">{blog.title}</h1>
            <div className="description">
              {blog.description.split("\n").map((item, index) => (
                <p key={index}>
                  {item}
                  <br />
                  <br />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
