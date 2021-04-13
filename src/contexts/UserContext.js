import React, { createContext, useState } from "react" //eslint-disable-line

export const UserContext = React.createContext({
    setUser: () =>{},
    user: {}
})

export const UserContainer = ({children}) => {

    const [user,setUser] = useState({userId: "default", admin: false})

    const handleUserChange = (userId, admin) => {
        setUser({userId: userId, admin: admin})
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
