import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import "./academic.scss";

function Academic() {
    const [academicEntries, setAcademicEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        degree: '',
        university: '',
        years: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEntry.degree && newEntry.university && newEntry.years) {
            setAcademicEntries(prevEntries => [...prevEntries, newEntry]);
            setNewEntry({ degree: '', university: '', years: '' }); // Reset the form
        }
    };

    const handleDeleteEntry = (indexToDelete) => {
        setAcademicEntries(prevEntries => prevEntries.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="academic-details">
            <h1>Academic</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="degree">Degree:</label>
                    <input type="text" id="degree" name="degree" value={newEntry.degree} onChange={handleInputChange} placeholder="e.g., B.Sc. Computer Science" />
                </div>
                <div>
                    <label htmlFor="university">University:</label>
                    <input type="text" id="university" name="university" value={newEntry.university} onChange={handleInputChange} placeholder="e.g., Massachusetts Institute of Technology" />
                </div>
                <div>
                    <label htmlFor="years">Years Attended:</label>
                    <input type="text" id="years" name="years" value={newEntry.years} onChange={handleInputChange} placeholder="e.g., 2015 - 2019" />
                </div>
                <button type="submit"><FaPlus /></button>
            </form>
            <ul>
                {academicEntries.map((entry, index) => (
                    <li key={index}>
                        {entry.degree} at {entry.university} ({entry.years})
                        <button onClick={() => handleDeleteEntry(index)}><FaTimes /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Academic;
