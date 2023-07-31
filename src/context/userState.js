import React, { useState } from 'react';
import userContext from './userContext';

const UserState=(props)=>{
    const host = "http://localhost:5000";

    
    const userData = async () => {
        const response = await fetch(`${host}/api/auth/fetchuser`, {
          method: "POST",    
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYTdmMmM3M2JhNTUxYzk1NGQxMzBjIn0sImlhdCI6MTY5MDIwOTc2Nn0.84LjYaxNr-c9sG8-4hfTJYVSOM2bbx-c5R599-jYvuM"
            }
        });
        const json=await response.json();
        return json;
    }

    return (
        <userContext.Provider value={{userData,checkBalance}} >
          {props.children}
        </userContext.Provider>
      )
}
export default UserState;