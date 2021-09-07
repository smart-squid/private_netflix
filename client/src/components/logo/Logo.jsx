import { Link } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";

const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} alt="Logo" />
        </Link>
    );
};

export default Logo;
