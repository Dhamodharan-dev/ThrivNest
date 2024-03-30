import React, { useEffect, useState } from 'react';
import '../CSS/PropertySection.css';

function PropertyItems({ properties, filters }) {
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // Apply filtering based on the filter criteria
    let filtered = properties.filter(property => {
      // Apply filtering based on type
      if (filters.type !== 'ALL' && property.type !== filters.type) {
        return false;
      }
      // Apply filtering based on budget
      if (filters.budget && parseFloat(property.price) >= parseFloat(filters.budget)) {
        return false;
      }
      // Apply filtering based on address
      if (filters.address && !property.address.toLowerCase().includes(filters.address.toLowerCase())) {
        return false;
      }
      return true;
    });

    if (filters.sortBy === 'LOW TO HIGH') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'HIGH TO LOW') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    // Update the filtered properties state
    setFilteredProperties(filtered);
  }, [properties, filters]);

  return (
    <>
      {filteredProperties.length ? (
        filteredProperties.map(property => (
          <div key={property._id} className='prop-items'>
            <div className='prop-img-div'>{property.image && <img src={`http://localhost:5000/${property.image}`} alt='Property' className='prop-img'/>}</div>
            <div className='prop-details'>
            {property.type.length ? (<h3>Type: {property.type}</h3>) : (<h3>Type: Other</h3>)}
            {property.price !== "" ? (<p>Price: {property.price}</p>) : <p>Price: Not Available</p>}
            {property.address.length ? (<p>Address: {property.address}</p>) : <p>Address: Not Available</p>}
            {property.owner ? (<p>Owner: {property.owner}</p>) : <p>Owner: Not Available</p>}
            {property.contact ? (<p>Contact: {property.contact}</p>) : <p>Contact: Not Available</p>}
            </div>
          </div>
        ))
      ) : (
        <p className='prop-p'>No properties found.</p>
      )}
    </>
  );
}

export default PropertyItems;
