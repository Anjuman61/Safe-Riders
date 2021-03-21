import React, { useContext, useEffect } from 'react';
import { RiderContext } from '../../App';
import fakeData from '../../fakeData/data.json'
import AllRiders from '../AllRiders/AllRiders';
import './Home.css'

const Home = () => {
    const [riders, setRiders] = useContext(RiderContext);
    useEffect(()=>{
        setRiders(fakeData);
    },[fakeData]) 
    // console.log(fakeData);
    return (
        <div >
            <div className='row riders-container '>
                {riders.map(rider =>
                    <AllRiders key={rider.id} rider={rider}></AllRiders>
                )}
            </div>
        </div>
    );
};

export default Home;