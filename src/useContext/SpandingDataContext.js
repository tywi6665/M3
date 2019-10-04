import React from 'react';

const SpendingDataContext = React.createContext();

const SpendingDataProvider = ({ children }) => {
    return (
        <SpendingDataContext.Provider value={}>
            {children}
        </SpendingDataContext.Provider>
    );
};

export { SpendingDataContext, SpendingDataProvider };