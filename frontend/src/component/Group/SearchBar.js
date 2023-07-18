import React, { useState } from 'react';
import "./SearchBar.css"

const SearchBar = ({ allUsers, onAddUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleAddUser = (userId) => {
    onAddUser(userId);
    setSearchQuery('');
    setFilteredUsers([]);
  };

  return (
    <div className="SearchBarContainer">
        <input
            className="SearchInput"
            type="text"
            placeholder="Search users by name or email"
            value={searchQuery}
            onChange={handleSearch}
        />
        <ul className="UserList">
            {filteredUsers.map((user) => (
                <li key={user._id} className="UserListItem">
                <div>
                    <span className="UserName">{user.name}</span> -{' '}
                    <span className="UserEmail">{user.email}</span>
                </div>
                <button className="AddButton" onClick={() => handleAddUser(user._id)}>
                    Add
                </button>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default SearchBar;
