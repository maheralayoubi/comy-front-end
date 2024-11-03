import { Link } from "react-router-dom";
import "./styles/UserCard.scss";

const UserCard = ({ user }) => {
  return (
    <div className="user-card" key={user.id}>
      <Link to={`/preview/${user.id}`} target="_blanck">
        <img
          src={
            user.profileImageUrl
              ? user.profileImageUrl
              : "images/profileImage.png"
          }
          alt={user.name}
          className="user-image"
        />
        <p className="user-position">{user.category}</p>
        <p className="user-name">{user.name}</p>
      </Link>
    </div>
  );
};

export default UserCard;
