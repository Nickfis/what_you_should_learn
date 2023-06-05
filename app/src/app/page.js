import Ranking from "./components/Ranking";
import connectToDb from "@/utils/connectToDb";

export default async function Home() {
  const client = await connectToDb();
  const res =
    await client.query(`SELECT c.*, v.publishing_date, va.overall_views FROM courses c
  JOIN videos v
  ON v.course_id = c.course_id
  JOIN (
  SELECT course_id, SUM(view_count) as overall_views FROM videos GROUP BY course_id) va
  ON va.course_id = c.course_id
  WHERE v.video_number = 1`);

  const allCourses = res.rows;
  client.end();
  console.log(allCourses[0]);

  return (
    <main>
      <h2>Top 20 Courses</h2>
      <Ranking allCourses={allCourses} type="course" />
    </main>
  );
}

export const revalidate = 601;
