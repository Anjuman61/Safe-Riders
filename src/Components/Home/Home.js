import React, { useContext } from 'react';
import { RiderContext } from '../../App';
import fakeData from '../../fakeData/data.json'
import AllRiders from '../AllRiders/AllRiders';
import './Home.css'

const Home = () => {
    const [riders, setRiders] = useContext(RiderContext);
    setRiders(fakeData);
    console.log(fakeData);


    return (
        <div >
            <div className='row riders-container '>
                {riders.map(rider =>
                    <AllRiders rider={rider}></AllRiders>
                )}
            </div>
        </div>
    );
};

export default Home;