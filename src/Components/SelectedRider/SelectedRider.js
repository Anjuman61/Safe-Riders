import React, { useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData/data.json';
import './SelectedRider.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShowMap from '../ShowMap/ShowMap';


const SelectedRider = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {name} = useParams();
    const selectedRider = fakeData.find(rider => rider.name === name);
    console.log(selectedRider);

    const [location, setLocation] = useState(false);


    return (
        <div className='row'>
            <div className='col-6-sm-12'>
                {location ?
                    (<div className="rider-selection-card">
                        <div className='rider-option'>
                            <img src={selectedRider.image} width='30px' alt="rider" />
                            <p> {selectedRider.name}</p>
                            <p> {selectedRider.passengerCapacity1}</p>
                            <p>$  {selectedRider.fare1}</p>
                        </div>
                        <div className='rider-option'>
                            <img src={selectedRider.image} width='30px' alt="rider" />
                            <p> {selectedRider.name}</p>
                            <p> {selectedRider.passengerCapacity2}</p>
                            <p>$  {selectedRider.fare2}</p>
                        </div>
                        <div className='rider-option'>
                            <img src={selectedRider.image} width='30px' alt="rider" />
                            <p> {selectedRider.name}</p>
                            <p> {selectedRider.passengerCapacity3}</p>
                            <p>$ {selectedRider.fare3}</p>
                        </div>

                    </div>
                    ) :
                    (
                        <div className="rider-selection-card">
                            <div>
                                <label >Pick From</label>
                                <input type="text" className="form-control" id="" placeholder="Mirpur" />
                            </div>
                            <br />
                            <div>
                                <label >Pick To</label>
                                <input type="text" className="form-control" id="" placeholder="Dhanmondi" />
                            </div>
                            <br />
                            <div>
                                <label> Select Date</label>
                                <br />
                                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <button className="btn btn-danger button" onClick={() => setLocation(!location)}>Search</button>
                        </div>
                    )}

            </div>

            <div className="col-6-sm-12 map">
                <ShowMap></ShowMap>
            </div>

        </div>

    );
};

export default SelectedRider;