import React, { useRef } from 'react'
import { useContext, useState } from 'react';
import itemContext from '../context/itemcontext';
export default function VendorItems(props) {
    let global_id;
    const closeRef = useRef(null);
    const { item } = props;
    const context = useContext(itemContext);
    const [itemCredentials, setitemCredentials] = useState({ name: "", price: "", quantity: "", photoUrl: "", description: "", type: "" });
    const { editItems,deleteItems } = context;
    const onChange = (e) => {
        setitemCredentials({ ...itemCredentials, [e.target.name]: e.target.value });
    }
    const showAlert = (response) => {
        const alertHTML = `
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>${response}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
        const alertContainer = document.getElementById("body2");
        alertContainer.insertAdjacentHTML('afterbegin', alertHTML);
    }

    const updateItem = async (id) => {
        const response = await editItems(itemCredentials.name, itemCredentials.description, itemCredentials.type, itemCredentials.photoUrl, itemCredentials.price, itemCredentials.quantity, id);
        showAlert(response);
        closeRef.current.click();
    }
    const deleteitem = async (id) => {
        console.log("hello");
        const response = await deleteItems(id);
        showAlert(response);
        closeRef.current.click();
    }
   
    const id_Changer = (id) => {
        global_id = id;
    }

    const deleteitem1=(id)=>{
       
        id_Changer(id);
        deleteitem(global_id);
    }
    return (
        <>
            {/* here is the modal */}
            <div className="modal" tabInde="-1" role="dialog" id='exampleModal2'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className='d-flex flex-column justify-content-center my-3'>
                            <div className='align-self-center'> <h3>Edit Item </h3> </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">New Name</span>
                                <input type="name" aria-label="First name"  className="form-control" name='name' value={itemCredentials.name} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">New Price</label>
                                <input type="number" className="form-control"  id="exampleInputEmail1" value={itemCredentials.price} aria-describedby="emailHelp" name='price' onChange={onChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">New Description</span>
                                <input type="text" aria-label="First name" className="form-control" value={itemCredentials.description} name='description' onChange={onChange} />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Edit Quantity</span>
                                <input type="number" className="form-control" name='quantity' value={itemCredentials.quantity} onChange={onChange} />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Edit Photo Link</span>
                                <input type="url" aria-label="First name" className="form-control" value={itemCredentials.photoUrl} name='photoUrl' onChange={onChange} />
                            </div>
                            <div className="form-check">
                                <div>
                                    <input className="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="fashion" onChange={onChange} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Fashion
                                    </label>
                                </div>
                                <div>
                                    <input className="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="electronic device" onChange={onChange} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Electronic Item
                                    </label>
                                </div>
                                <div>
                                    <input className="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="grocery" onChange={onChange} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Grocery
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => updateItem(global_id)}>Edit Item</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card my-2" id='body2' >
                <div className="card" style={{ width: '10rem', height: "10rem" }}>

                    <img src={item.photoUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                            {item.quantity} items
                        </p>
                        <div className='d-flex my-3'>
                            {/* <i className="fa-solid fa-trash mx-2" id='icon' style={{ cursor: 'pointer' }} onClick={() => id_Changer(item._id) } ></i> */}
                            <i className="fa-solid fa-trash mx-2" id="icon" style={{ cursor: 'pointer' }} onClick={() =>  deleteitem1(item._id) }></i>
                            <i className="fa-solid fa-pen-to-square mx-2 " data-bs-toggle="modal" data-bs-target="#exampleModal2" id='icon' style={{ cursor: 'pointer' }} onClick={() => id_Changer(item._id)}></i>
                        </div>
                        <button type="button " className="btn btn-primary  disabled"  >
                            Rs {item.price}
                        </button>
                    </div>

                </div>
            </div>
        </>

    )
}
