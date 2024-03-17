import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import { IAuth } from "./pages/Registration"
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"

interface StatusProps {
    previous: IAuth
}

const Status: FC<StatusProps> = ({ previous }) => {
    const navigate = useNavigate()
    const { signUp } = useAuthContext()
    const [statusValue, setStatusValue] = useState('')
    const [authState, setAuthState] = useState<IAuth>(previous)
    const [notification, setNotification] = useState('')
    const [fetchError, setFetchError] = useState('')

    const sendDataToServer = (userData: IAuth) => {
        setNotification('Connection...')
        signUp(userData)
            .then(e => {
                setNotification('')
                if (e.status < 300) {
                    navigate('/')
                } else {
                    setFetchError(`${e.status} Error. ${e.message}`)
                    setTimeout(() => setFetchError(''), 3000)
                }
            })
    }

    useEffect(() => {
        setAuthState(prev => ({ ...prev, status: statusValue }))
        if (statusValue.length < 15) {
            setNotification(`Status is too short. Add ${15 - statusValue.length} characters`);
        } else {
            setNotification('')
        }
    }, [statusValue])

    const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusValue(e.target.value)
    }
    
    const sumbitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (statusValue.length > 10) {
            sendDataToServer(authState)
        }
        return 
    }

    return (
        <form className="text-white border rounded-tl-lg rounded-br-lg p-5 flex flex-col items-center gap-4" onSubmit={sumbitForm}>
            <h3 className="text-xl font-bold">Write your status</h3>
            <div>
                <label htmlFor="inputEmail">Status:</label>
                <input type="text" className="mt-2 block bg-gray-950 border rounded outline-none py-2 w-72 px-3" id="inputEmail" value={statusValue} onChange={statusHandler} />
            </div>
            <button className="bg-violet-700 w-full rounded py-2 font-medium purple_btn disabled:bg-violet-900 disabled:text-gray-300" type="submit" disabled={!!(notification || fetchError)}>
                Sign in
                <div className={`${(notification || fetchError) ? '' : 'shine'}`}></div>
            </button>
            <div className="flex items-center">
                <span className="line-b text-sm">2024</span>
                <span className="pl-4 text-sm">@box_with_ink</span>
            </div>
            {notification && <p>{notification}</p>}
            {fetchError && <p>{fetchError}</p>}
        </form>
    )
}

export default Status