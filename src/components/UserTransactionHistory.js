import React, { useContext } from 'react'
export default function UserTransactionHistory(props) {

    const { transaction } = props;



    return (
        <div>
            <ul className="list-group d-flex justify-content-center flex-row my-1">
                <li className="list-group-item" >Date: {transaction.date} </li>
                <li className="list-group-item" >Credit: {transaction.credit ? transaction.credit : "None"}</li>
                {transaction.credit ? <li className="list-group-item" >Credited through bank account</li> : <li className="list-group-item">Debit: {transaction.price}</li>}
                <li className="list-group-item" >Item bought: {transaction.item ? transaction.item  : "None"}</li>
            </ul>
        </div >
    )
}
