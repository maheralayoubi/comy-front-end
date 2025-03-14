import React, { useState } from "react";

import "./styles/SearchResults.scss";

import { getSearchResults } from "../../api/memberList";
import UserCard from "../top-pages/UserCard";
import Spinner from "../global/Spinner";
import Pagination from "../global/Pagination";
import { messages } from "../../constants/messages";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const totalPages = Math.ceil(users?.length / itemsPerPage);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setCurrentPage(1);
    setQuery(searchTerm);

    if (searchTerm.trim()) {
      setLoading(true);
      setError(null);

      try {
        const response = await getSearchResults(searchTerm);
        if (response && response.data && response.data.length > 0) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setError(messages.tryAgain);
      } finally {
        setLoading(false);
      }
    } else {
      setUsers([]);
    }
  };

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  // Slice users array for current page
  const paginatedUsers = users
    ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="search-results">
      <h2>検索結果</h2>
      <div className="search-results-container">
        <input
          autoFocus
          type="text"
          placeholder="検索"
          className="search-box"
          value={query}
          onChange={handleSearch}
        />
        <img src="/images/search.svg" alt="Search" className="search-icon" />
      </div>

      {loading && (
        <div className="loadUser">
          <p>検索中... </p>
          <Spinner />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
        {Array.isArray(users) && users.length > 0 ? (
          <>
            {paginatedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}

            <Pagination
              paginate={paginate}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          !loading && <p>{messages.notMatchingUser}</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
