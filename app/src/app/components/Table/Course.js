import { useWindowSize } from "@/utils/windowSize";
import Link from "next/link";

const Course = ({ course, ranking = true }) => {
  const { width } = useWindowSize();

  return (
    <li>
      <Link
        className="table__row table__row--course"
        passHref
        href={`/course/${course.course_id}`}
      >
        {ranking && (
          <h3
            className="course-page__metric"
            style={{
              borderColor: "green",
            }}
          >
            {course.ranking}
          </h3>
        )}
        <div className="table__video-content">
          <h4 className="table__row-headline">{course.title}</h4>
          <p className="table__row-date">
            {course.description
              .slice(0, width > 599 ? 150 : 75)
              .split(" ")
              .slice(0, -1)
              .join(" ")}
            ...
          </p>
        </div>
        <div className="table__row-views">
          <p>Overall Views:</p>
          <p>{Math.round(course.overall_views).toLocaleString()}</p>
        </div>
        <div className="table__row-views">
          <p>Year published:</p>
          <p>{course.publishing_date.substring(0, 4)}</p>
        </div>
      </Link>
    </li>
  );
};

export default Course;
