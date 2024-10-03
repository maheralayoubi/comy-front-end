import React, { useState } from "react";
import { getSearchResults } from "../api/memberList";
import "./styles/SearchResults.scss";
import { Link } from "react-router-dom";
import Spinner from "./global/Spinner";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
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
        setError("検索に失敗しました。もう一度お試しください。");
      } finally {
        setLoading(false);
      }
    } else {
      setUsers([]);
    }
  };

  return (
    <div className="search-results">
      <h2>検索結果</h2>
      <div className="search-results-container">
        <input
          type="text"
          placeholder="検索"
          className="search-box"
          value={query}
          onChange={handleSearch}
        />
        <img src="/images/search.svg" alt="Search" className="search-icon" />
      </div>

      {loading &&
        <div className="loadUser">
          <p>検索中... </p>
          <Spinner />
        </div>}
      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
        {Array.isArray(users) && users.length > 0
          ? users.map((user) => (
            <div className="user-card" key={user.id}>
              <Link to={`/preview/${user.id}`} target="_blanck">
                <img
                  src={
                    user.profileImageUrl
                      ? user.profileImageUrl
                      : "https://via.placeholder.com/120"
                  }
                  alt={user.name}
                  className="user-image"
                />
                <p className="user-position">{user.category}</p>
                <p className="user-name">{user.name}</p>
              </Link>
            </div>
          ))
          : !loading && <p>該当するユーザーが見つかりませんでした。</p>}
      </div>
    </div>
  );
};

export default SearchResults;
