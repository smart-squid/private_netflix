import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("/users?new=true", {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzFhMDcxOTVjMzhmYTg2NzhkODIzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDM1MDk1NSwiZXhwIjoxNjQwNDM3MzU1fQ.sMo-r7H1g3JlyyAUbkFO-VNxs_v1uF4OfBTPOZv23UY",
                    },
                });
                setNewUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">최근 가입한 사용자</span>
            <ul className="widgetSmList">
                {newUsers.map((user) => (
                    <li key={user._id} className="widgetSmListItem">
                        <img
                            src={
                                user.profilePic ||
                                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">
                                {user.userName}
                            </span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
