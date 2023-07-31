import React, { useContext, useEffect, useState, useRef } from 'react'
import itemContext from '../context/itemcontext'
import UserTransactionHistory from './UserTransactionHistory';
import {useNavigate} from "react-router-dom";

export default function MyWallet() {
  let navigate=useNavigate();
  const closeRef = useRef(null);
  const context = useContext(itemContext);
  const { userData, data, addBalance, getUserHistory, userHistory, userTransaction } = context;
  const [balance, setBalance] = useState("");
  useEffect(() => {

    if (localStorage.getItem("token")) {
      userData();
      getUserHistory();
    }
    else {
      navigate("/login");
    }
  }, [])

  const onChange = (e) => {
    setBalance(e.target.value);
  }
  const showAlert = (response) => {
    const alertHTML = `
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>${response}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
    const alertContainer = document.getElementById('phone');
    alertContainer.insertAdjacentHTML('afterbegin', alertHTML);
  }
  const balanceHandle = async () => {
    const response = await addBalance(parseInt(balance));
    showAlert(response);
    closeRef.current.click();
  }
  return (
    <>
      <div className="modal" tabInde="-1" role="dialog" id='payModal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Adding Balance to {data.name}'s account</h5>

            </div>

            <div className="modal-body">
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">PKR</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={onChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={balanceHandle} >Add Balance</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef} >Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="d-flex justify-content-center" id='nameUser'>Hello {data.name} !</h2>
      <ul className="list-group d-flex justify-content-center">
        <li className="list-group-item">Email: {data.email}</li>
        <li className="list-group-item" id='phone'>Phone: {data.phone}</li>
      </ul>

      <div className='d-flex justify-content-center'>
        <h3 className='list-group-item mx-2'> Current Balance:Rs {data.balance}</h3>
        <button type="button" className="btn btn-success  mx-2" data-bs-toggle="modal" data-bs-target="#payModal">Add Balance</button>
      </div>
      <div className='row my-3'>
        <h3 className='d-flex justify-content-center text-decoration-underline my-2'>Your Transaction History</h3>.
        { 
      
          userTransaction.map((transaction) => {

            return <UserTransactionHistory transaction={transaction} />
          })
         
        }
      </div>
    </>
  )
}


