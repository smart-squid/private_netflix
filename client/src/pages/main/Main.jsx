import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./main.scss";

const Main = () => {
    return (
        <div className="main">
            <Navbar />
            <Featured type="movie" />
            <List />
            <List />
        </div>
    );
};

export default Main;
