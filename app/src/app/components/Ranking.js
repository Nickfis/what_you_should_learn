"use client";
import { useState } from "react";
import Table from "./Table";
import { useWindowSize } from "@/utils/windowSize";

const Ranking = ({ allCourses }) => {
  const [rankBy, setRankBy] = useState("popularity");

  const createDataToDisplay = () => {
    if (rankBy === "popularity") {
      return allCourses
        .slice()
        .sort((a, z) => z.popularity_pct - a.popularity_pct)
        .slice(0, 20);
    } else {
      return allCourses
        .slice()
        .sort((a, z) => z.stick_with_it_metric_pct - a.stick_with_it_metric_pct)
        .slice(0, 20);
    }
  };

  return (
    <div className="ranking">
      <h4 className="ranking__title">
        Ranked by:{" "}
        <span
          className={`ranking__option ${
            rankBy === "popularity" && "ranking__option--active"
          }`}
          onClick={() => setRankBy("popularity")}
        >
          Popularity
        </span>{" "}
        |{" "}
        <span
          className={`ranking__option ${
            rankBy === "sticking" && "ranking__option--active"
          }`}
          onClick={() => setRankBy("sticking")}
        >
          Stickyness
        </span>
        <Table type="course" data={createDataToDisplay()} />
      </h4>
    </div>
  );
};
export default Ranking;
