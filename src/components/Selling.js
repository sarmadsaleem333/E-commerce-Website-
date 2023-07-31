import React, { useContext, useState, useEffect, useRef } from 'react'
import SellItems from './SellItems'
import itemContext from '../context/itemcontext'
import { useNavigate } from 'react-router-dom';

export default function Selling(props) {
    const navigate = useNavigate();
    const context = useContext(itemContext);
    const { items, getItems } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getItems();
        }
        else {
            navigate("/login");
        }
    }, [])

    return (
        <>

            <div className='d-flex justify-content-around '>
                {items.map((item) => {

                    return <SellItems key={item._id} type={props.type} item={item} />
                })}
            </div>
        </>
    )
}
