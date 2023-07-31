import React, { useRef, useContext } from 'react';
import itemContext from '../context/itemcontext';


export default function SellItems(props) {
  let global_id;
  const { item } = props;
  const closeRef = useRef(null);
  const context = useContext(itemContext);
  const { buyItems } = context;
  const showAlert = (response) => {
    const alertHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>${response}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
    const alertContainer = document.getElementById("carouselExampleControls");
    alertContainer.insertAdjacentHTML('afterbegin', alertHTML);
  }
  const payItems = async (id) => {
   
    const response = await buyItems(id);
   
    showAlert(response);
    closeRef.current.click();            //after paying items

  }


  const changeId = (id) => {
    global_id = id;
  }

  if (props.type === item.type) {
    return (
      <>
        {/* modal when buy button is pressed for confirmation of payment */}
        <div className="modal" tabInde="-1" role="dialog" id='exampleModal'>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Paying Rs.{item.price} from your Store Account</h5>
                <button ref={closeRef} type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {item.description}
              <div className="modal-body">
                <p> </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => payItems(global_id)}>Pay</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Cancel</button>
              </div>
            </div>
          </div>
        </div>


        <div className='my-3'>
          <div className="card" style={{ width: '10rem', height: "10rem" }}>
            <img src={item.photoUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                {item.quantity} items
              </p>
              <button type="button" className={`btn btn-primary ${global.isUser? "active":"disabled"} `} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => changeId(item._id)}>
                Rs {item.price} <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null; // Return null instead of an empty fragment
  }
}
