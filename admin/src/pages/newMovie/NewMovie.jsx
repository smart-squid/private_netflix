import { useContext, useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewMovie() {
    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSmall, setImgSmall] = useState(null);
    const [imgTrailer, setImgTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const {dispatch} = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovie(movie, dispatch).then(() => {
            window.location.href = "/movies";
        });
    }

    const upload = (items) => {
        const foldername = new Date().getTime().toString();
        items.forEach((item) => {
            const filename = foldername + "/[" + item.label + "]" + item.file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            console.log("File name " + filename + " is being uploaded");

            uploadTask.on(
                "state_changes",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload Progress: " + progress.toFixed(2) + "% done.");
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovie((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: "img" },
            { file: imgTitle, label: "imgTitle" },
            { file: imgSmall, label: "imgSmall" },
            { file: imgTrailer, label: "imgTrailer" },
            { file: video, label: "video" },
        ]);
    };

    return (
        <div className="newMovie">
            <h1 className="addMovieTitle">신규 컨텐츠 등록</h1>
            <form className="addMovieForm">
                <div className="addMovieItem">
                    <label>메인 이미지</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>제목 이미지</label>
                    <input
                        type="file"
                        id="imgTitle"
                        name="imgTitle"
                        onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>썸네일 이미지</label>
                    <input
                        type="file"
                        id="imgSmall"
                        name="imgSmall"
                        onChange={(e) => setImgSmall(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>제목</label>
                    <input
                        type="text"
                        placeholder="컨텐츠 제목을 입력하세요"
                        id="title"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>상세 설명</label>
                    <textarea
                        placeholder="상세 설명을 입력하세요"
                        id="desc"
                        name="desc"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>장르</label>
                    <input
                        type="text"
                        placeholder="장르를 입력하세요"
                        id="genre"
                        name="genre"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>출연 배우</label>
                    <input
                        type="text"
                        placeholder="배우를 입력하세요. ex) 이병헌, 수애"
                        id="actors"
                        name="actors"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>출시일</label>
                    <input
                        type="text"
                        placeholder="출시일을 입력하세요"
                        id="releaseDate"
                        name="releaseDate"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>시리즈 여부</label>
                    <select
                        name="isSeries"
                        id="isSeries"
                        onChange={handleChange}
                    >
                        <option value="true">예</option>
                        <option value="false">아니오</option>
                    </select>
                </div>
                <div className="addMovieItem">
                    <label>트레일러 영상</label>
                    <input
                        type="file"
                        id="imgTrailer"
                        name="imgTrailer"
                        onChange={(e) => setImgTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>메인 영상</label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>
                {uploaded === 5 ? (
                    <button className="addMovieButton" onClick={handleSubmit}>컨텐츠 생성</button>
                ) : (
                    <button className="addMovieButton" onClick={handleUpload}>
                        미디어 등록
                    </button>
                )}
            </form>
        </div>
    );
}
