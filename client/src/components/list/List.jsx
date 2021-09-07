import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list }) {
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [throttle, setThrottle] = useState(false);

    const listRef = useRef();

    const slide = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 50;

        if (direction === "left") {
            setIsLast(false);
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;

            if (slideNumber === 1) {
                setIsFirst(true);
            } else {
                setIsFirst(false);
            }
        } else if (direction === "right") {
            setIsFirst(false);
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${
                -230 + distance
            }px)`;

            if (slideNumber === 2) {
                setIsLast(true);
            } else {
                setIsLast(false);
            }
        }
    };

    const handleClick = (direction) => {
        if (throttle) {
            return;
        } else {
            setThrottle(true);
            setTimeout(async () => {
                slide(direction);
                setThrottle(false);
            }, 300);
        }
    };

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: isFirst && "none" }}
                />
                <div className="container" ref={listRef}>
                    {list.content.map((item, i) => (
                        <ListItem index={i} item={item} key={i} />
                    ))}
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                    style={{ display: isLast && "none" }}
                />
            </div>
        </div>
    );
}
