import * as React from 'react';
import './Header.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const [search, setSearch] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="header">
      <h1>React Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleSearchChange} value={search} />
      </form>
    </div>
  );
};

export default Header;
