import {
    Add,
    PlayArrow,
    ThumbDownOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "./listItem.scss";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/" + item, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzFhMDcxOTVjMzhmYTg2NzhkODIzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDM1MDk1NSwiZXhwIjoxNjQwNDM3MzU1fQ.sMo-r7H1g3JlyyAUbkFO-VNxs_v1uF4OfBTPOZv23UY",
                    },
                });
                console.log(res.data);
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovie();
    }, [item]);

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>
            <div
                className="listItem"
                style={{
                    left: isHovered && index * 225 - 50 + index * 2.5,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie.img} alt="" />
                {isHovered && (
                    <>
                        <video
                            src={movie.imgTrailer}
                            autoPlay={true}
                            loop
                            muted
                        />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.actors}</span>
                                <span>{movie.genre}</span>
                                <span>{movie.duration}</span>
                                <span>{movie.releaseDate}</span>
                            </div>
                            <div className="desc">{movie.desc}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}
