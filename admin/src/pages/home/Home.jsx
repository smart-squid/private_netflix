import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
    const MONTHS = useMemo(
        () => [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ],
        []
    );
    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("stats/user", {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzFhMDcxOTVjMzhmYTg2NzhkODIzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTAxOTk0MSwiZXhwIjoxNjMxMTA2MzQxfQ.09EYXvlUfND_RViQHj2DiJRnLUMn1CZNjreU4xdTlFM",
                    },
                });

                const statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                });

                statsList.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            "신규 사용자": item.total,
                        },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={userStats}
                title="사용자 통계"
                grid
                dataKey="신규 사용자"
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
