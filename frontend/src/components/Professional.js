import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import "./professional.scss";

function Professional() {
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [newExperience, setNewExperience] = useState({
        company: '',
        title: '',
        duration: '',
        description: ''
    });

    const handleAddSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills(prevSkills => [...prevSkills, newSkill]);
            setNewSkill('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToDelete));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperience(prev => ({ ...prev, [name]: value }));
    };

    const handleAddExperience = () => {
        if (newExperience.title && newExperience.company) {
            setExperiences(prevExperiences => [...prevExperiences, newExperience]);
            setNewExperience({ company: '', title: '', duration: '', description: '' });
        }
    };

    const handleDeleteExperience = (indexToDelete) => {
        setExperiences(prevExperiences => prevExperiences.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="professional-details">
            <h2>Professional Experience</h2>
            <div className="experience-form">
                <input type="text" name="title" value={newExperience.title} onChange={handleInputChange} placeholder="Job Title" />
                <input type="text" name="company" value={newExperience.company} onChange={handleInputChange} placeholder="Company" />
                <input type="text" name="duration" value={newExperience.duration} onChange={handleInputChange} placeholder="Duration" />
                <textarea name="description" value={newExperience.description} onChange={handleInputChange} placeholder="Job Description" />
                <button onClick={handleAddExperience}><FaPlus /></button>
            </div>
            <ul>
                {experiences.map((exp, index) => (
                    <li key={index}>
                        <strong>{exp.title} at {exp.company}</strong> ({exp.duration})
                        <p>{exp.description}</p>
                        <button onClick={() => handleDeleteExperience(index)}><FaTimes /></button>
                    </li>
                ))}
            </ul>

            <h2>Skills</h2>
            <div>
                <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a new skill" />
                <button onClick={handleAddSkill}><FaPlus /></button>
            </div>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        {skill}
                        <button onClick={() => handleDeleteSkill(skill)}><FaTimes /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Professional;
