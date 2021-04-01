import React, { createContext, useState } from "react" //eslint-disable-line
export const SnackbarContext = React.createContext({
    setSnackbar: () => {
    },
    snackbar: {}
})

export const SnackbarContainer = ({ children }) => {
    const severityArr = ["error", "warning", "info", "success"]
    
    // !HOW TO USE SNACKBAR!
    // When Calling setSnackbar() Pass corresponding integer for severity:
    // 0 -> Error -- Red
    // 1 -> Warning -- Yellow
    // 2 -> Info -- Blue
    // 3 -> Success -- Green
    // Message is the message you want to dispay
    // Duration is optional but the default value is 6000ms

    const [snackbar, setSnackbar] = useState({
        message: "",
        severity: "",
        duration: 6000 // Default duration in ms. If this is, changed remember to also change in Snackbar.js
    })
    // This hadnles the change here locally. setSnackbar is the exported function.
    const handleSnackbarSet = (message, severity, duration) => {
        setSnackbar({severity: severityArr[severity], message: message, duration: duration })
    }

    const contextValue = {
        setSnackbar: handleSnackbarSet,
        snackbar
    }

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
        </SnackbarContext.Provider>
    )
}