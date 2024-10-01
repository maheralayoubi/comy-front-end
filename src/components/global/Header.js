import React from "react"
import "./styles/Header.scss"

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/images/comy-logo.png" alt="Logo" className="logo" />
                <div className="search-container">
                    <a href="/search-results">
                        <input
                            type="text"
                            placeholder="メンバー検索"
                            className="search-input"
                        />
                    </a>
                    <img
                        src="/images/search.svg"
                        alt="Search"
                        className="search-icon"
                    />
                </div>
            </div>
            <div className="header-right">
                <img
                    src="/images/account_circle.svg"
                    alt="Account"
                    className="account-icon"
                />
                <span className="account-text">マイページ</span>
            </div>
        </header>
    )
}

export default Header
