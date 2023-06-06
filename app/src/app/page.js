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
  WHERE v.video_number = 1 AND c.available_videos > 2`);

  const allCourses = res.rows;
  client.end();

  return (
    <main>
      <h2>Top 20 Courses</h2>
      <Ranking allCourses={allCourses} />
    </main>
  );
}

export const revalidate = 601;
