import * as React from 'react';

import './Header.css';
import { NavLink } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const [search, setSearch] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="header">
      <h1>React Movies</h1>
      <div className="header-link-group">
        <NavLink
          to="/nowplaying"
          className="header-link"
          activeClassName="header-link-selected"
        >
          Now Playing
        </NavLink>
        <NavLink
          to="/asdf"
          className="header-link"
          activeClassName="header-link-selected"
        >
          Account
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} />
    </div>
  );
};

export default Header;
