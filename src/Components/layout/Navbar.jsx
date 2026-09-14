import { NavLink } from "react-router-dom";


function Navbar(){

    return(<>
    <nav className="navbar">
        <NavLink to = '/' className = "logo">
            Anime Finder
        </NavLink>  
        

        <div className="nav-links">
            <NavLink to='/'>Search</NavLink>
            <NavLink to='/favourites'>Favourites</NavLink>
        </div>



    </nav>
    </>)

}

export default Navbar