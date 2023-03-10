import { useContext, useState } from 'react'

import { UserContext } from './UserContext'


export const AuthProvider = ({ children }) => {
    const { isAuthenticated } = useContext(UserContext)

    return (
        <>
            {isAuthenticated && (children)}
        </>
    )
}