import React, { useState } from 'react';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';

const SearchAccount = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <FiSearch />
            <div onClick={toggleModal} style={{ cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                <FiMoreHorizontal />
                <span style={{ marginLeft: '5px' }}>My Account</span>
            </div>
            {isModalOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: '#fff', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 100 }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}><button onClick={() => {/* Handle login */ }}>Login</button></li>
                        <li><button onClick={() => {/* Handle register */ }}>Register</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchAccount;
