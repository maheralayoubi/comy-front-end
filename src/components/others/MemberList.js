import React, { useEffect, useState } from "react";

import "./styles/MemberList.scss";

import { getMemberList } from "../../api/memberList";
import { SpinnerPage } from "../global/Spinner";
import Pagination from "../global/Pagination";
import { messages } from "../../constants/messages";
import UserCard from "../top-pages/UserCard";

const MemberList = ({ businessSheetData }) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const totalPages = Math.ceil(users?.length / itemsPerPage);

  React.useEffect(() => {
    if (businessSheetData) {
      console.log("MemberList received businessSheetData:", businessSheetData);
    }
  }, [businessSheetData]);

  useEffect(() => {
    getMemberList()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(messages.tryAgain);
      });
  }, []);

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  // Slice users array for current page
  const paginatedUsers = users
    ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="member-list">
      <h2>メンバー一覧</h2>
      {!users && <SpinnerPage />}
      {users && (
        <>
          <div className="user-list">
            {paginatedUsers?.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default MemberList;
