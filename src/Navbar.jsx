import Logout from './Logout.jsx'

function Navbar() {

    return(
        <div className='flex w-full h-fit border border-pink-500 justify-between px-10 text-lg py-2'>
            <ul className="flex w-4/5 justify-around lg:w-2/5">
                <li><a href="">Logo</a></li>
                <li><a href="">Our Product</a></li>
                <li><a href="">Learn More</a></li>
            </ul>
            <Logout/>
        </div>
    )
}


export default Navbar