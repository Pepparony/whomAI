

function Notfound() {
    return(
    <div className="h-screen w-screen grid place-items-center">
    <div className="grid place-items-center space-y-5">
        <div className="font-bold text-xl">Page not found</div>
        <span className="text-zinc-700">404 error</span>
        <a className="text-blue-600 hover:underline" href="/models">≤ Your models</a>
    </div>
    </div>
    )
}

export default Notfound;