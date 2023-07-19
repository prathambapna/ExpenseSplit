import React, { Fragment, useState } from 'react';

const SearchBarParticipants = ({allUsers,onAddUsers}) => {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filteredUsers = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
        setDropdownOpen(true);
    };

    const handleUserSelection = (user) => {
        const isSelected = selectedUsers.some((participant) => participant.user === user._id);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter((participant) => participant.user !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, { user: user._id }]);
        }
    };

    const handleDropdownItemClick = (e) => {
        e.stopPropagation();
    };

    const handleDone = (e) => {
        e.preventDefault();
        onAddUsers(selectedUsers);
        setDropdownOpen(false); 
    };

    return (
        <Fragment>
            <div className="SearchBarContainer">
                <input
                    className="SearchInput"
                    type="text"
                    placeholder="Search participant by name or email"
                    value={searchQuery}
                    onChange={handleSearch}
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                />
                {dropdownOpen && <ul className="UserList">
                    {filteredUsers.map((user) => (
                        <li key={user._id} className="UserListItem" onClick={handleDropdownItemClick}>
                        <div>
                            <span className="UserName">{user.name}</span> -{' '}
                            <span className="UserEmail">{user.email}</span>
                        </div>
                        <input
                            type="checkbox"
                            checked={selectedUsers && selectedUsers.some((p)=>p.user===user._id)}
                            onChange={() => handleUserSelection(user)}
                        />
                        </li>
                    ))}
                </ul>}
                <div className="DoneButtonContainer">
                    <button className="DoneButton" onClick={handleDone}>
                        Done
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default SearchBarParticipants