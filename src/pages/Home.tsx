import MainPage from "../layout/MainPage"
import '../css/bgGradient.css'
import { useAuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getStatuses, getUsers } from "../helpers/authHelper"

const Home = () => {
    const { isAuthenticated } = useAuthContext()
    const [statuses, setStatuses] = useState<{ [key: string]: string }[] | string>([])
    const [users, setUsers] = useState< string[] | string>([])

    useEffect(() => {
        setStatuses('No statuses...')
        getStatuses()
            .then((e) => {
                if (e.status < 300) {
                    setStatuses(e.statuses)
                }
            })
            setUsers('No users...')
            getUsers()
            .then((e) => {
                if (e.status < 300) {
                    setUsers(e.users)
                }
            })
    }, [])

    return (
        <MainPage>
            <main className="max-w-8xl px-5 sm:px-8 m-auto text-white pt-5 flex gap-6 justify-center flex-col items-center sm:flex-row mb-5 sm:items-start">
                <div className="w-3/4 lg:w-3/4">
                    <div className="rounded bg-slate-900 border border-slate-600 font-bold text-3xl text-violet-200 p-3 mb-7">Statuses <span className="text-violet-400">:</span></div>
                    <div className="rounded bg-gray-900 border border-slate-500 font-normal text-xl text-violet-100 p-3 flex flex-col gap-3 mb-9">
                        {typeof statuses === 'string' ? <p>{statuses}</p> : statuses.map((e: { [key: string]: string }, i) => {
                            const email = Object.keys(e)[0]
                            return <div key={i} className="border-b pb-3 border-slate-500"><p>{e[email]}</p><p className="text-base">@{email}</p></div>
                        })}
                    </div>
                </div>
                <div className="flex bgGradient p-3 flex-col justify-between w-3/4 lg:w-1/4 mb-8">
                    <div>
                        <p className=" font-bold text-2xl text-center text-violet-200 pb-2">Users <span className="text-white">:</span></p>
                        <div className="flex flex-col justify-center gap-1 items-center lg:items-start pt-2 mb-5">
                            {typeof users === 'string' ? <p className="font-medium text-base">{users}</p> : users.map((e, i) => <p key={i} className="font-semibold">{e}</p>)}
                        </div>
                    </div>
                    {!isAuthenticated && (<Link className="underline font-semibold text-center" to="/authorization">Want to join? Login.</Link>)}
                </div>
            </main>

        </MainPage>

    )
}

export default Home