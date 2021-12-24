import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import movieInfo from "../../assets/imgs/movieinfo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = ({type}) => {
    const [featured, setFeatured] = useState({});
    console.log(type);

    useEffect(() => {
        const getRandomMovie = async () => {
            try {
                const res = await axios.get(`/movies/find/random${type ? "?type=" + type : ""}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzFhMDcxOTVjMzhmYTg2NzhkODIzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDM1MDk1NSwiZXhwIjoxNjQwNDM3MzU1fQ.sMo-r7H1g3JlyyAUbkFO-VNxs_v1uF4OfBTPOZv23UY",
                    }
                });
                setFeatured(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomMovie();
    }, [type]);
    console.log(featured);
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="cen">Hidden</option>
                        <option value="uncen">Clean</option>
                    </select>
                </div>
            )}
            <img
                src={featured.img}
                alt=""
            />
            <div className="info">
                <img src={featured.imgtitle} alt="" />
                <span className="desc">
                    {featured.desc}
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
