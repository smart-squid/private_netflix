import { ArrowDropDown } from "@material-ui/icons";
import profile from "../../assets/imgs/profile1.jpg";
import "./profile.scss";

const Profile = () => {
    return (
        <div className="profile">
            <img src={profile} alt="My Profile" />
            <ArrowDropDown className="icon" />
            <div className="options">
                <span>Settings</span>
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Profile;
