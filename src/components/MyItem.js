import React, { useContext, useRef } from 'react'
import itemContext from '../context/itemcontext'
import { useEffect, useState } from 'react';
import VendorItems from './VendorItems';
export default function MyItem() {
    const closeRef = useRef(null);
    const [itemCredentials, setitemCredentials] = useState({ name: "", price: "", quantity: "", photoUrl: "", description: "", type: "" });
    const context = useContext(itemContext);
    const { myItems, getMyItems, uploadItems } = context;
    useEffect(() => {
        getMyItems();
    }, [])
    const onChange = (e) => {
        setitemCredentials({ ...itemCredentials, [e.target.name]: e.target.value });
    }
  
    const showAlert = (response) => {
        const alertHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>${response}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
        const alertContainer = document.getElementById("body");
        alertContainer.insertAdjacentHTML('afterbegin', alertHTML);
    }

    const uploadItem = async () => {
        console.log(itemCredentials)
        const response = await uploadItems(itemCredentials.name, itemCredentials.description, itemCredentials.type, itemCredentials.photoUrl, itemCredentials.price, itemCredentials.quantity);
        showAlert(response);
        closeRef.current.click();

    }

    return (
        <>
            {/* here is the modal */}
            <div className="modal" tabInde="-1" role="dialog" id='exampleModal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className='d-flex flex-column justify-content-center my-3'>
                            <div className='align-self-center'> <h3>Uploading Item</h3> </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Name of Item</span>
                                <input type="name" aria-label="First name" class="form-control" name='name' value={itemCredentials.name} onChange={onChange} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Price</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" value={itemCredentials.price} aria-describedby="emailHelp" name='price' onChange={onChange} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Enter Description</span>
                                <input type="text" aria-label="First name" class="form-control" value={itemCredentials.description} name='description' onChange={onChange} />
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Enter Quantity</span>
                                <input type="number" class="form-control" name='quantity' value={itemCredentials.quantity} onChange={onChange} />
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Photo link(Not Neccessary)</span>
                                <input type="url" aria-label="First name" class="form-control" value={itemCredentials.photoUrl} name='photoUrl' onChange={onChange} />
                            </div>
                            <div class="form-check">
                                <div>
                                    <input class="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="fashion" onChange={onChange} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Fashion
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="electronic device" onChange={onChange} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Electronic Item
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="grocery" onChange={onChange} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Grocery
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={uploadItem}>Upload</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Upload Item</div>
            <div className="d-flex flex-row justify-content-around" id='body'>
                {
                    myItems.map((item) => {
                        return <VendorItems item={item} key={item._id} />
                    })
                }
            </div>
        </>

    )
}
