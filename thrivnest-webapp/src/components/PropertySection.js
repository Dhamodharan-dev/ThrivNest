import React, { useEffect, useState } from 'react';
import PropertyItems from './PropertyItems';
import '../CSS/PropertySection.css';

function PropertySection({ navigate, properties }) {
  const [filters, setFilters] = useState({
    sortBy: 'SELECT',
    budget: '',
    type: 'ALL',
    address: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const isloggedin = localStorage.getItem('loggedIn')
  useEffect(() => {
    if (!isloggedin) {
      navigate('/login'); // Navigate to the login page if not logged in
    }
  }, [isloggedin, navigate]);

  return (
    <div className='prop-section' id='prop-section'>
      <h1 className='h1-prop' id='properties'>Properties</h1>
      <div className='filter-section'>
        <div>
          <label className='prop-label'>Sort By</label>
          <select className='prop-input' name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="SELECT">DATE(A-Z)</option>
            <option value="LOW TO HIGH">LOW TO HIGH</option>
            <option value="HIGH TO LOW">HIGH TO LOW</option>
          </select>
        </div>
        <div>
          <label className='prop-label'>Budget</label>
          <input
            type='number'
            className='prop-input'
            name="budget"
            value={filters.budget}
            onChange={handleFilterChange}
          ></input>
        </div>
        <div>
          <label className='prop-label'>Type</label>
          <select className='prop-input' name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="ALL">ALL</option>
            <option value="1RK">1RK</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className='prop-label'>Address</label>
          <input type='text' placeholder='Search address' className='prop-input' name="address" value={filters.address} onChange={handleFilterChange} />
        </div>
      </div>
      <div className='properties'>
        <h1>Property List</h1>
        <div className='prop-list'>
          <PropertyItems properties={properties} filters={filters} />
        </div>
      </div>
    </div>
  )
}

export default PropertySection;
