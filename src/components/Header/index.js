import React from 'react';
import './header.scss';
import { useGlobalContext } from '../../store/StoreProvider';
import { onThemeChange } from '../../store/actions';

const Header = () => {
    const { dispatch } = useGlobalContext();

    return (
        <div className="header">
            <div className="header__group">
                <span className="header__title">ZoKrates</span>
            </div>
            <div className="header__group">
                <div className="header__item">
                    <select className="select select--primary" onChange={(e) => dispatch(onThemeChange(e.target.value))}>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="textmate">TextMate</option>
                        <option value="eclipse">Eclipse</option>
                        <option value="chrome">Chrome</option>
                    </select>
                </div>
                <a className="header__item" href="https://zokrates.github.io/gettingstarted.html" target="_blank">Learn ZoKrates</a>
                <a className="header__item" href="https://github.com/Zokrates/ZoKrates" target="_blank">
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    );
};

export default Header;