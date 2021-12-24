import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function MovieList() {
    const { movies, dispatch } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };
    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "movie",
            headerName: "컨텐츠명",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="movieListItem">
                        <img
                            className="movieListImg"
                            src={params.row.img}
                            alt=""
                        />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "genre", headerName: "장르", width: 120 },
        { field: "releaseDate", headerName: "발매일", width: 120 },
        { field: "actors", headerName: "배우", width: 120 },
        {
            field: "action",
            headerName: "편집",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={{pathname:"/movie/" + params.row._id, movie:params.row}}>
                            <button className="movieListEdit">수정</button>
                        </Link>
                        <DeleteOutline
                            className="movieListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="movieList">
            <DataGrid
                rows={movies}
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                checkboxSelection
                getRowId={(r) => r._id}
            />
        </div>
    );
}
