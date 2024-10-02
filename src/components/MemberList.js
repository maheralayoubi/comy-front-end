import React, { useEffect, useState } from "react";
import { getMemberList } from "../api/memberList";
import "./styles/MemberList.scss";

const MemberList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMemberList()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError("ユーザー情報を取得できませんでした。");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="member-list">
      <h2>メンバー一覧</h2>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img
              src={user.profileImageUrl}
              alt={user.name}
              className="user-image"
            />
            <p className="user-position">{user.category}</p>
            <p className="user-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
