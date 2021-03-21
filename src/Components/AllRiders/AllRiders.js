import React from 'react';
import { useHistory } from 'react-router';
import './AllRiders.css'

const AllRiders = (props) => {
    const { name, image } = props.rider;
    const history = useHistory();
    const handleRider = (riderName) => {
        history.push(`/rider/${name}`);
    }
    return (
        <div className='col-lg-3 col-sm-12 rider-card'>
            <img src={image} alt="Riders" />
            <h4>{name}</h4>
            <button onClick={() => handleRider(name)} className="btn btn-danger button">View More</button>
        </div>

    );
};

export default AllRiders;