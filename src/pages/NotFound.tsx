import MainPage from "../layout/MainPage"

const NotFound = () => {
    return (
        <MainPage>
            <div className="text-white font-bold text-5xl flex flex-col justify-center items-center pt-20">
            ERROR 404
            <div className="text-3xl font-normal pt-4">The page not found.</div>
            </div>
        </MainPage>
    )
}

export default NotFound