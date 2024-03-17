import React from "react"
import Navbar from "../components/Navbar"

const MainPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gray-950 w-full h-screen">
            <Navbar />
            <div className="bg-gray-950">
                {children}
            </div>

        </div>
    )
}

export default MainPage
