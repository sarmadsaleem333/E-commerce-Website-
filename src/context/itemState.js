import React, { useState } from 'react';
import itemContext from './itemcontext';
const ItemState = (props) => {

  const host = "http://localhost:5000";

  const itemsInitial = [];
  const dataInitial = {};
  const userHistory = [];
  const [items, setItems] = useState(itemsInitial);
  const [data, setData] = useState(dataInitial);
  const [myItems, setMyItems] = useState(itemsInitial);
  const [userTransaction, setUserTransaction] = useState(userHistory);
  const getItems = async () => {
    const response = await fetch(`${host}/api/item/getallitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json)
    setItems(json);
  }

  const buyItems = async (id) => {
    const response = await fetch(`${host}/api/accounts/buyitems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    return json;
  }
  const userData = async () => {
    const response = await fetch(`${host}/api/auth/fetchuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setData(json);
  }
  const addBalance = async (balance) => {
    const response = await fetch(`${host}/api/accounts/useraddbalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ balance })
    });
    const json = await response.json();
    return json;
  }

  const getUserHistory = async () => {
    const response = await fetch(`${host}/api/accounts/userhistory`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setUserTransaction(json);
  }

  const getMyItems = async () => {
    const response = await fetch(`${host}/api/item/fetchmyitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem("token"),
      }
    });
    const json = await response.json();
    setMyItems(json);
  }
  
  const uploadItems = async (name,description,type,photoUrl,price,quantity) => {
    const response = await fetch(`${host}/api/item/additem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem("token"),
      },
      body: JSON.stringify({name,description,type,photoUrl,price,quantity})
    });
    const json = await response.json();
    return json;
  }
  const editItems = async (name,description,type,photoUrl,price,quantity,id) => {
    const response = await fetch(`${host}/api/item/updateitem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem("token"),
      },
      body: JSON.stringify({name,description,type,photoUrl,price,quantity})
    });
    const json = await response.json();
    return json;
  }
  const deleteItems = async (id) => {
    const response = await fetch(`${host}/api/item/deleteitem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem("token"),
      },
      body: JSON.stringify({id})
    });
    const json = await response.json();
    return json;
  }





  return (
    <itemContext.Provider value={{ items, deleteItems,getItems, buyItems, editItems,addBalance, userData, setData, data, setUserTransaction, getUserHistory, userTransaction, myItems, getMyItems,uploadItems}}>
      {props.children}
    </itemContext.Provider>
  )

}
export default ItemState;