import React, { createContext, useState, useContext } from "react" //eslint-disable-line

export const UserContext = React.createContext({
    setUser: () =>{},
    user: {}
})

export const UserContainer = ({children}) => {

    const [user,setUser] = useState({email: "default",
    fName: "default",
    id: "defauly",
    isAdmin: false,
    lName: "default",
    _attachments: "default",
    _etag: "default",
    _rid: "default",
    _self: "default",
    _ts: 1615660487})

    const handleUserChange = (user) => {
        console.log("CTX setUser")
        console.log(user)
        setUser(user)
    }

    const contextValue = {
        setUser: handleUserChange,
        user
    }

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}
