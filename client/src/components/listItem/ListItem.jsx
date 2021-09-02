import {
    Add,
    PlayArrow,
    ThumbDownOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import "./listItem.scss";

export default function ListItem(index) {
    const [isHovered, setIsHovered] = useState(false);
    const trailer = "https://video.twimg.com/ext_tw_video/1254930175248052224/pu/vid/720x404/hqWGFB2TYpK9QFBo.mp4?tag=10";
    return (
        <div
            className="listItem"
            style={{
                left: isHovered && index.index * 225 - 50 + index.index * 2.5,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="https://i2.avdbs.com/actor/a06/6608_ns.jpg" alt="" />
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop muted />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>Action</span>
                            <span>74 mins</span>
                            <span className="ageLimit">+15</span>
                            <span>2017</span>
                        </div>
                        <div className="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Eius iste nihil tenetur. Saepe eum dolorum
                            corrupti impedit,
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
