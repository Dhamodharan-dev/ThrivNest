import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/PostProperty.css';

function PostProperty({ loggedIn, navigate, username }) {
    const [propertyData, setPropertyData] = useState({
        type: '',
        price: '',
        address: '',
        owner: '',
        contact: '',
        image: null, // New state variable for the image file
        username: username
    });
    
    const handlePostProperty = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('type', propertyData.type);
            formData.append('price', propertyData.price);
            formData.append('address', propertyData.address);
            formData.append('owner', propertyData.owner);
            formData.append('contact', propertyData.contact);
            formData.append('username', username);
            formData.append('image', propertyData.image); // Append image file to form data

            await axios.post('http://localhost:5000/api/property', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Property posted successfully');
            setPropertyData({
                type: '',
                price: '',
                address: '',
                owner: '',
                contact: '',
                image: null // Reset image state
            });
            navigate('/properties');
        } catch (error) {
            console.error('Error posting property:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle image input change
    const handleImageChange = (e) => {
        setPropertyData(prevState => ({
            ...prevState,
            image: e.target.files[0] // Update image state with selected file
        }));
    };

    return (
        <>
            {loggedIn ? (
                <div className='postproperty-page'>
                    <div className='postproperty-container'>
                        <h1 className='post-title'>Post Property</h1>
                        <form className='post-form' onSubmit={handlePostProperty}>
                            <div className='post-field'>
                                <label className='post-label'>Type</label>
                                <select
                                    className='post-input'
                                    name='type'
                                    value={propertyData.type}
                                    onChange={handleChange}
                                    required
                                    >
                                    <option>Other</option>
                                    <option>1RK</option>
                                    <option>1BHK</option>
                                    <option>2BHK</option>
                                    <option>3BHK</option>
                                    <option>4BHK</option>
                                </select>
                            </div>
                            <div className='post-field'>
                                <label className='post-label'>Price</label>
                                <input
                                    type='number'
                                    className='post-input'
                                    name='price'
                                    value={propertyData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='post-field'>
                                <label className='post-label'>Address</label>
                                <input
                                    type='text'
                                    placeholder='Enter address'
                                    className='post-input'
                                    name='address'
                                    value={propertyData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='post-field'>
                                <label className='post-label'>Owner</label>
                                <input
                                    type='text'
                                    className='post-input'
                                    name='owner'
                                    value={propertyData.owner}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='post-field'>
                                <label className='post-label'>Contact</label>
                                <input
                                    type='number'
                                    className='post-input'
                                    name='contact'
                                    value={propertyData.contact}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Add image input field */}
                            <div className='post-field'>
                                <label className='post-label'>Image</label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            <button type='submit' className='login-submit'>Post</button>
                        </form>
                    </div>
                </div>
            ) : (navigate('/login'))}
        </>
    );
}

export default PostProperty;
