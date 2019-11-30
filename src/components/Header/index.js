import React from 'react';
import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__title" href="#">ZoKrates</div>
            <div className="header__group">
                <a className="header__link" href="https://zokrates.github.io/gettingstarted.html" target="_blank">Learn ZoKrates</a>
                <a className="header__link" href="https://github.com/Zokrates/ZoKrates" target="_blank">
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    );
};

export default Header;