import connectToDb from "@/utils/connectToDb";
import { formatDate } from "@/utils/dateFunctions";
import { getMetricColor } from "@/utils/helper";
import CourseLineChart from "@/app/components/CourseLineChart";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const client = await connectToDb();

  try {
    const res = await client.query(`SELECT * FROM courses 
    WHERE available_videos > 0`);
    const courses = res.rows;

    return courses
      .filter((course) => course["available_videos"])
      .map((course) => ({
        courseId: course.id,
      }));
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

const Course = async ({ params }) => {
  const client = await connectToDb();
  const { courseId } = params;
  const [resCourse, resVideo] = await Promise.all([
    client.query(`SELECT * FROM courses c WHERE course_id=$1`, [courseId]),
    client.query(
      `SELECT * FROM videos c WHERE course_id=$1 
    ORDER BY video_number ASC`,
      [courseId]
    ),
  ]);

  const course = resCourse.rows[0];
  const videos = resVideo.rows;

  client.release();

  const expectedViews = videos.map((video) => ({
    video_number: video.video_number,
    views: video.expected_views,
    title: video.title_on_youtube,
  }));

  const actualViews = videos.map((video) => ({
    video_number: video.video_number,
    views: video.view_count,
    title: video.title_on_youtube,
  }));

  const dataToDisplay = videos.map((video) => ({
    "Video Number": video.video_number,
    "Actual Views": Math.round(video.view_count),
    "Expected Views": Math.round(video.expected_views),
    title: video.title_on_youtube,
  }));

  //   What to display:
  // Publishing date of first video.
  // total view count across all videos
  // average view acount
  // popularity score
  // stick with it metric

  //   chart showing expected vs actual views
  return (
    <div className="course-page">
      <section className="course-page__overview">
        <div className="card course-page__info">
          <h1 className="mb-xs">{course.title}</h1>
          <h6 className="course-page__published mb-m">
            Published: {formatDate(videos[0].publishing_date)}
          </h6>
          <p className="mb-l">{course.description}</p>
          <p>
            This course consists of {course.available_videos} video lectures.
          </p>
        </div>
        <div className="card course-page__metrics">
          <h3
            className="course-page__metric"
            style={{
              borderColor: getMetricColor(
                Math.round(course.popularity_pct * 100)
              ),
            }}
          >
            {Math.round(course.popularity_pct * 100)}%
          </h3>
          <h3
            className="course-page__metric"
            style={{
              borderColor: getMetricColor(
                Math.round(course["stick_with_it_metric_pct"] * 100)
              ),
            }}
          >
            {Math.round(course["stick_with_it_metric_pct"] * 100)}%
          </h3>
        </div>
      </section>
      <h2 className="course-page__section-headline">Course Lecture Views</h2>
      <div className="course-page__views-chart">
        <CourseLineChart data={dataToDisplay} />
      </div>
      <h2 className="course-page__section-headline">All Course Lectures</h2>
    </div>
  );
};

export default Course;
