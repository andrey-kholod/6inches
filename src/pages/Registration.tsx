import { FormEvent, useEffect, useState } from "react"
import MainPage from "../layout/MainPage"
import { Link } from "react-router-dom";
import Status from "../Status";


export interface IAuth {
    nickname: string;
    password: string;
    status: string;
}

interface IValidate {
    nickname: boolean;
    password: boolean;
    allFilled: boolean
}


const Registration = () => {
    const [auth, setAuth] = useState<IAuth>({ nickname: "", password: "", status: "" })
    const [validate, setValidate] = useState<IValidate>({ nickname: true, password: true, allFilled: false })
    const [isReadyToWriteStatus, setIsReadyToWriteStatus] = useState(false)


    useEffect(() => {
        setValidate(prev => ({ ...prev, allFilled: !!(auth.nickname.trim() && auth.password.trim()) }))

    }, [auth])

   
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValidate(prev => ({ ...prev, nickname: !!auth.nickname.trim(), password: !!auth.password.trim() }))

        if (validate.allFilled) {
            setIsReadyToWriteStatus(!isReadyToWriteStatus)
        }
    }

    return (
        <MainPage>
            <div className="flex mt-20 justify-center">
                {isReadyToWriteStatus ? <Status previous={auth}/> : <form className="text-white border rounded-tl-lg rounded-br-lg p-5 flex flex-col items-center gap-4" onSubmit={e => submitForm(e)}>
                    <h3 className="text-xl font-bold">Registration</h3>
                    <div>
                        <label htmlFor="inputEmail">Nickname:</label>
                        <input type="email" className="mt-2 block bg-gray-950 border rounded outline-none py-2 w-72 px-3 focus:border-violet-600" id="inputEmail" value={auth.nickname} onChange={(e) => setAuth(prev => ({ ...prev, nickname: e.target.value }))} />
                        {!validate.nickname && (<div>Invalid email!</div>)}
                    </div>
                    <div>
                        <label htmlFor="inputPassword">Password:</label>
                        <input type="text" className="mt-2 block bg-gray-950 border rounded outline-none py-2 w-72 px-3 focus:border-violet-600" id="inputPassword" value={auth.password} onChange={(e) => setAuth(prev => ({ ...prev, password: e.target.value }))} />
                        {!validate.password && (<div>Invalid password!</div>)}
                    </div>
                    <button className="bg-violet-700 w-full rounded py-2 font-medium purple_btn" type="submit" >Sign up
                        <div className="shine"></div>
                    </button>
                    <Link to={'/authorization'} className="bg-gray-100 w-full rounded py-2 font-semibold text-blue-500 text-center hover:bg-gray-300 hover:text-blue-800 transition-colors duration-300" type="submit">Already have an account?</Link>
                    <div className="flex items-center">
                        <span className="line-b text-sm">2024</span>
                        <span className="pl-4 text-sm">@box_with_ink</span>
                    </div>
                </form>}
            </div>
        </MainPage>
    )
}

export default Registration