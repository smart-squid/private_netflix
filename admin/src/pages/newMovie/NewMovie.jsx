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
            <h1 className="addMovieTitle">?????? ????????? ??????</h1>
            <form className="addMovieForm">
                <div className="addMovieItem">
                    <label>?????? ?????????</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>?????? ?????????</label>
                    <input
                        type="file"
                        id="imgTitle"
                        name="imgTitle"
                        onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>????????? ?????????</label>
                    <input
                        type="file"
                        id="imgSmall"
                        name="imgSmall"
                        onChange={(e) => setImgSmall(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>??????</label>
                    <input
                        type="text"
                        placeholder="????????? ????????? ???????????????"
                        id="title"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>?????? ??????</label>
                    <textarea
                        placeholder="?????? ????????? ???????????????"
                        id="desc"
                        name="desc"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>??????</label>
                    <input
                        type="text"
                        placeholder="????????? ???????????????"
                        id="genre"
                        name="genre"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>?????? ??????</label>
                    <input
                        type="text"
                        placeholder="????????? ???????????????. ex) ?????????, ??????"
                        id="actors"
                        name="actors"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>?????????</label>
                    <input
                        type="text"
                        placeholder="???????????? ???????????????"
                        id="releaseDate"
                        name="releaseDate"
                        onChange={handleChange}
                    />
                </div>
                <div className="addMovieItem">
                    <label>????????? ??????</label>
                    <select
                        name="isSeries"
                        id="isSeries"
                        onChange={handleChange}
                    >
                        <option value="true">???</option>
                        <option value="false">?????????</option>
                    </select>
                </div>
                <div className="addMovieItem">
                    <label>???????????? ??????</label>
                    <input
                        type="file"
                        id="imgTrailer"
                        name="imgTrailer"
                        onChange={(e) => setImgTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addMovieItem">
                    <label>?????? ??????</label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>
                {uploaded === 5 ? (
                    <button className="addMovieButton" onClick={handleSubmit}>????????? ??????</button>
                ) : (
                    <button className="addMovieButton" onClick={handleUpload}>
                        ????????? ??????
                    </button>
                )}
            </form>
        </div>
    );
}
