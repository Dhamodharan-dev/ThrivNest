import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProperty({ propertyId, properties, navigate }) {
    const [propertyData, setPropertyData] = useState({
        type: '',
        price: '',
        address: '',
        owner: '',
        contact: '',
        image: null,
        username: ''
    });

    useEffect(() => {
        const getUsername = localStorage.getItem('username');
        if (propertyId && properties.length > 0) {
            const property = properties.find(property => property._id === propertyId);
            if (property) {
                setPropertyData({
                    type: property.type || '',
                    price: property.price || '',
                    address: property.address || '',
                    owner: property.owner || '',
                    contact: property.contact || '',
                    image: null, // Don't set image initially to prevent re-upload
                    username: getUsername
                });
            } else {
                console.error('Property not found with ID:', propertyId);
            }
        }
    }, [propertyId, properties]);

    const handleUpdateProperty = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('type', propertyData.type);
            formData.append('price', propertyData.price);
            formData.append('address', propertyData.address);
            formData.append('owner', propertyData.owner);
            formData.append('contact', propertyData.contact);
            formData.append('image', propertyData.image);
            formData.append('username', propertyData.username);

            // Send PUT request to update the property
            await axios.put(`http://localhost:5000/api/property/${propertyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Property updated successfully');
            navigate('/dashboard')
            // Redirect or handle success
        } catch (error) {
            console.error('Error updating property:', error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setPropertyData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    return (
        <div className='postproperty-page'>
            <div className='postproperty-container'>
                <h2>Edit Property</h2>
                <form className='post-form' onSubmit={handleUpdateProperty}>
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
                    <div className='post-field'>
                        <label className='post-label'>Image</label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button type='submit' className='login-submit'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditProperty;
