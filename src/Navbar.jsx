import Logout from './Logout.jsx'

function Navbar() {

    return(
        <div className='flex w-full h-fit justify-between px-10 text-lg py-2'>
            <ul className="flex w-4/5 justify-around lg:w-2/5 place-items-center tracking-wide">
                <li className="justify-self-start"><a href="" className="underline-offset-8 hover:underline hover:text-blue-600">Logo</a></li>
                <li className="hidden sm:inline"><a href="" className="underline-offset-8 hover:underline hover:text-blue-600">Our Product</a></li>
                <li className="hidden sm:inline"><a href="" className="underline-offset-8 hover:underline hover:text-blue-600">Learn More</a></li>
            </ul>
            <Logout/>
        </div>
    )
}


export default Navbar