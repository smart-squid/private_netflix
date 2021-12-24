import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./main.scss";

const Main = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                let listQuery = null;
                if (type) {
                    listQuery = "?type=" + type;
                    if (genre) {
                        listQuery += "&genre=" + genre;
                    }
                } else {
                    if (genre) {
                        listQuery = "?genre=" + genre;
                    }
                }
                const res = await axios.get(
                    `lists${listQuery ? listQuery : ""}`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzFhMDcxOTVjMzhmYTg2NzhkODIzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDM1MDk1NSwiZXhwIjoxNjQwNDM3MzU1fQ.sMo-r7H1g3JlyyAUbkFO-VNxs_v1uF4OfBTPOZv23UY",
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);
    return (
        <div className="main">
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List list={list} key={list._id} />
            ))}
        </div>
    );
};

export default Main;
