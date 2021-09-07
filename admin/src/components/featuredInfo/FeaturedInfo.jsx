import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">신규 사용자</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">1</span>
          <span className="featuredMoneyRate">
            +1 <ArrowUpward  className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">지난 달과 비교</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">매출</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">지난 달과 비교</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">영상 조회수</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">25</span>
          <span className="featuredMoneyRate">
            +25 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">지난 달과 비교</span>
      </div>
    </div>
  );
}
