import { NavLink } from "react-router-dom";
import './Navbar.css'
function Navbar(){

    return(<>
    <nav className="navbar">
        <NavLink to = '/' className = "logo">
            Anime Finder
        </NavLink>  
        

        <div className="nav-links">
            <NavLink to='/' className={({isActive}) => isActive ? "active" : ""}>Search</NavLink>
            <NavLink to='/favourites' className={({isActive}) => isActive ? "active" : ""}>Favourites</NavLink>
        </div>



    </nav>
    </>)

}

export default Navbar