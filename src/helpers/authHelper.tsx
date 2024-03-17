import { UserData } from "../context/AuthContext"
import { API_URL } from '../../env'

const URL = API_URL || 'localhost:5173'

export const signInUser = async (userData: Omit<UserData, 'status'>) => {
    try {

        const data = await fetch(`http://${URL}/api/sign_in`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        return await data.json()
    }
    catch(e) {
        return {status: 503, message: 'ERR_CONNECTION_REFUSED', ok: false}
    }
}


export const signUpUser = async (userData: UserData) => {
    try {

        const data = await fetch(`http://${URL}/api/sign_up`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        return await data.json()
    }
    catch(e) {
        return {status: 503, message: 'ERR_CONNECTION_REFUSED', ok: false}
    }
}


export const getStatuses = async () => {
    try {
       const response = await fetch(`http://${URL}/api/get_statuses`)

       return await response.json()
    }
    catch(e) {
        return {status: 503, message: 'ERR_CONNECTION_REFUSED', ok: false}
    }
}

export const getUsers = async () => {
    try {
       const response = await fetch(`http://${URL}/api/get_users`)

       return await response.json()
    }
    catch(e) {
        return {status: 503, message: 'ERR_CONNECTION_REFUSED', ok: false}
    }
}