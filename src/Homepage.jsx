
import Logout from './Logout.jsx'

function Homepage() {
    return(
        <div className="h-screen w-sceen grid place-items-center">
            <Logout/>
            <div className="text-orange-500">Welcome to the homepage</div>
            <div><a href="/register">Go to the register page</a></div>
        </div>
    )
}


export default Homepage;