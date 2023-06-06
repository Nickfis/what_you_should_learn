"use client";
import { useState } from "react";
import Table from "./Table";

const SearchContainer = ({ allCourses, allTopics }) => {
  const [searchValues, setSearchValues] = useState({
    available_videos: null,
    popularity: null,
    stickiness: null,
    topic: null,
    name: null,
  });

  const onChange = (e) => {
    setSearchValues({
      ...searchValues,
      [e.target.name]: e.target.value,
    });
  };

  const filterByName = (course) => {
    if (!searchValues.name) {
      return true;
    }
    return (
      course.title.toLowerCase().includes(searchValues.name.toLowerCase()) ||
      course.description.toLowerCase().includes(searchValues.name.toLowerCase())
    );
  };

  const filterByPopularity = (course) => {
    if (!searchValues.popularity) {
      return true;
    }
    return parseInt(searchValues.popularity) < course.popularity_pct * 100;
  };

  const filterByStickiness = (course) => {
    if (!searchValues.stickiness) {
      return true;
    }
    return (
      parseInt(searchValues.stickiness) < course.stick_with_it_metric_pct * 100
    );
  };

  const filterByTopic = (course) => {
    if (!searchValues.topic) {
      return true;
    }
    return course.topics.includes(searchValues.topic);
  };

  const filterCourses = () => {
    return allCourses
      .filter(filterByName)
      .filter(filterByPopularity)
      .filter(filterByStickiness)
      .filter(filterByTopic)
      .slice()
      .sort((a, z) => {
        z.popularity_pct - a.popularity_pct;
      });
  };

  return (
    <div className="search">
      <div className="search__found-courses">
        {filterCourses().length} courses, sorted by popularity
      </div>
      <div className="search__filter-box">
        <h4 className="mb-l">Search</h4>
        <input
          className="input--text mb-s"
          name="name"
          value={searchValues.name}
          onChange={onChange}
          placeholder="Search by name"
        />
        <select
          name="topic"
          className="input--dropdown mb-s"
          onChange={onChange}
          value={searchValues.topic}
        >
          <option value="" selected>
            {searchValues.topic ? "Remove filter" : "Select topic"}
          </option>
          {allTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <fieldset className="input--fieldset mb-s">
          <legend>Popularity</legend>
          <label className="input--hidden">
            <input
              type="radio"
              name="popularity"
              value=""
              onChange={onChange}
              checked={searchValues.popularity === ""}
            />
            No filter
          </label>
          {["25", "50", "75"].map((value) => (
            <label className="input--radio mb-xs">
              <input
                type="radio"
                name="popularity"
                value={value}
                onChange={onChange}
                checked={searchValues.popularity === value}
              />
              Minimum: {value}%
            </label>
          ))}
        </fieldset>
        <fieldset className="input--fieldset mb-s">
          <legend>Stickiness</legend>
          <label className="input--hidden">
            <input
              type="radio"
              name="stickiness"
              value=""
              onChange={onChange}
              checked={searchValues.stickiness === ""}
            />
            No filter
          </label>
          {["25", "50", "75"].map((value) => (
            <label className="input--radio mb-xs">
              <input
                type="radio"
                name="stickiness"
                value={value}
                onChange={onChange}
                checked={searchValues.stickiness === value}
              />
              Minimum: {value}%
            </label>
          ))}
        </fieldset>
      </div>
      <Table data={filterCourses()} type="courseWithThumbnail" />
    </div>
  );
};

export default SearchContainer;
