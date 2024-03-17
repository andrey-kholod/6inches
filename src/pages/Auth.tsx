import { FormEvent, useEffect, useState } from "react"
import MainPage from "../layout/MainPage"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface IAuth {
    nickname: string;
    password: string;
}

interface IValidate {
    nickname: boolean;
    password: boolean;
    allFilled: boolean
}


const Auth = () => {
    const navigate = useNavigate()
    const { logIn } = useAuthContext()
    const [auth, setAuth] = useState<IAuth>({ nickname: "", password: "" })
    const [validate, setValidate] = useState<IValidate>({ nickname: true, password: true, allFilled: false })
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setValidate(prev => ({ ...prev, allFilled: !!(auth.nickname.trim() && auth.password.trim()) }))
    }, [auth])

    const sendDataToServer = (userData: IAuth) => {
        setDisabled(!disabled)
        logIn(userData)
            .then(e => {
                if (e.status < 300) {
                    navigate('/')
                } else {
                    setError(`${e.status} Error. ${e.message}`)
                    setTimeout(() => {
                        setError('')
                        setDisabled(false)
                    }, 2000)
                }
            })
    }

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValidate(prev => ({ ...prev, nickname: !!auth.nickname.trim(), password: !!auth.password.trim() }))

        if (validate.allFilled) {
            setAuth({ nickname: '', password: '' })
            sendDataToServer(auth)
        }
    }

    return (
        <MainPage>
            <div className="flex mt-20 justify-center">
                <form className="text-white border rounded-tl-lg rounded-br-lg p-5 flex flex-col items-center gap-4" onSubmit={e => submitForm(e)}>
                    <h3 className="text-xl font-bold">Authorization</h3>
                    <div>
                        <label htmlFor="inputEmail">Nickname:</label>
                        <input type="email" className="mt-2 block bg-gray-950 border rounded outline-none py-2 w-72 px-3" id="inputEmail" value={auth.nickname} onChange={(e) => setAuth(prev => ({ ...prev, nickname: e.target.value }))} />
                        {!validate.nickname && (<div>Invalid nickname!</div>)}
                    </div>
                    <div>
                        <label htmlFor="inputPassword">Password:</label>
                        <input type="text" className="mt-2 block bg-gray-950 border rounded outline-none py-2 w-72 px-3" id="inputPassword" value={auth.password} onChange={(e) => setAuth(prev => ({ ...prev, password: e.target.value }))} />
                        {!validate.password && (<div>Invalid password!</div>)}
                    </div>
                    <button className="bg-violet-700 w-full rounded py-2 font-medium purple_btn disabled:bg-violet-900 disabled:text-gray-300" type="submit" disabled={disabled}>Sign in
                        <div className={`${disabled ? '' : 'shine'}`}></div>
                    </button>
                    <Link to={'/registration'} className="bg-gray-100 w-full rounded py-2 font-medium text-blue-500 text-center hover:bg-gray-300 hover:text-blue-800 transition-colors duration-300" type="submit">New to <span className="underline decoration-blue-500 font-semibold">#demo?</span></Link>
                    <div className="flex items-center">
                        <span className="line-b text-sm">2024</span>
                        <span className="pl-4 text-sm">@box_with_ink</span>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </MainPage>
    )
}

export default Auth