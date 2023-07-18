import React, { useState } from 'react';

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
    <div>
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}{' '}
            <button onClick={() => handleAddUser(user._id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
