import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";

export default function Movie() {
    const location = useLocation();
    const movie = location.movie;

    return (
        <div className="movie">
            <div className="movieTitleContainer">
                <h1 className="movieTitle">컨텐츠 상세 정보</h1>
                <Link to="/newmovie">
                    <button className="movieAddButton">신규 컨텐츠 등록</button>
                </Link>
            </div>
            <div className="movieTop">
                <div className="movieTopLeft">
                    <Chart data={productData} dataKey="Sales" title="조회수" />
                </div>
                <div className="movieTopRight">
                    <div className="movieInfoTop">
                        <img src={movie.img} alt="" className="movieInfoImg" />
                        <span className="movieName">{movie.title}</span>
                    </div>
                    <div className="movieInfoBottom">
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">ID:</span>
                            <span className="movieInfoValue">
                                {movie._id}
                            </span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">장르:</span>
                            <span className="movieInfoValue">
                                {movie.genre}
                            </span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">출연배우:</span>
                            <span className="movieInfoValue">
                                {movie.actors}
                            </span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">출시일:</span>
                            <span className="movieInfoValue">
                                {movie.releaseDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movieBottom">
                <form className="movieForm">
                    <div className="movieFormLeft">
                        <label>컨텐츠 제목</label>
                        <input type="text" placeholder={movie.title} />
                        <label>상세 설명</label>
                        <textarea rows="4" placeholder={movie.desc} />
                        <label>장르</label>
                        <input type="text" placeholder={movie.genre} />
                        <label>출연 배우</label>
                        <input type="text" placeholder={movie.actors} />
                        <label>트레일러 영상</label>
                        <input type="file" />
                        <label>메인 영상</label>
                        <input type="file" />
                    </div>
                    <div className="movieFormRight">
                        <div className="movieUpload">
                            <img
                                src={movie.img}
                                alt=""
                                className="movieUploadImg"
                            />
                            <label>
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                            />
                        </div>
                        <button className="movieButton">변경사항 적용</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
