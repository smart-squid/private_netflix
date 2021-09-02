import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import movieInfo from "../../assets/imgs/movieinfo.png";

const Featured = (type) => {
    return (
        <div className="featured">
            {type.type && (
                <div className="category">
                    <span>{type.type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="cen">Hidden</option>
                        <option value="uncen">Clean</option>
                    </select>
                </div>
            )}
            <img
                src="https://i1.avdbs.com/img/main_actor/main-2105-1.jpg"
                alt=""
            />
            <div className="info">
                <img src={movieInfo} alt="" />
                <span className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br />
                    Earum, dolores dolorum nam necessitatibus nesciunt
                    cupiditate
                    <br />
                    excepturi ullam ducimus iure inventore veritatis minus vel
                    <br /> quaerat nihil architecto unde esse facilis
                    voluptatibus.
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
