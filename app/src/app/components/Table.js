import Course from "./Table/Course";
import Lecture from "./Table/Lecture";

const Table = ({ data, type = "videoLecture" }) => {
  const renderTable = () => {
    switch (type) {
      case "videoLecture":
        return data.map((element) => (
          <Lecture key={element.video_id} video={element} />
        ));
      case "course":
        return data.map((course, idx) => (
          <Course
            key={course.course_id}
            course={{ ...course, ranking: idx + 1 }}
          />
        ));
      case "outstandingLectures":
        return data.map((element) => (
          <Lecture key={element.video_id} video={element} withFactor={true} />
        ));

      case "courseWithThumbnail":
        return data.map((course, idx) => (
          <Course key={course.course_id} course={course} ranking={false} />
        ));
      default:
        break;
    }
  };

  return <ul className="table">{renderTable()}</ul>;
};

export default Table;
