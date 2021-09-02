import "./navbar.scss";
import Logo from "../logo/Logo";
import Profile from "../profile/Profile";
import { Notifications, Search } from "@material-ui/icons";
import { useState } from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Logo />
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <Notifications className="icon" />
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
