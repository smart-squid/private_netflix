import { ArrowBackIosOutlined } from "@material-ui/icons";
import "./watch.scss";

export default function Watch() {
    return (
        <div className="watch">
            <div className="back">
                <ArrowBackIosOutlined />
                Home
            </div>
            <video
                className="video"
                autoPlay
                progress="true"
                controls
                src="https://video.twimg.com/ext_tw_video/1254930175248052224/pu/vid/720x404/hqWGFB2TYpK9QFBo.mp4?tag=10"
            ></video>
        </div>
    );
}
