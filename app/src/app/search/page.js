import SearchContainer from "../components/SearchContainer";

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

  const resTopics = await client.query("SELECT * FROM topics");
  const allTopics = {};
  resTopics.rows.map((topic) => {
    if (Object.keys(allTopics).includes(topic.course_id)) {
      allTopics[topic.course_id].push(topic.topic);
    } else {
      allTopics[topic.course_id] = [topic.topic];
    }
  });

  const allCourses = res.rows.map((course) => ({
    ...course,
    topics: allTopics[course.id],
  }));
  client.end();

  const uniqueTopicsSet = new Set(resTopics.rows.map((topic) => topic.topic));
  const uniqueTopics = Array.from(uniqueTopicsSet).sort();

  return (
    <main>
      <h2>All MIT Courses</h2>
      <SearchContainer allCourses={allCourses} allTopics={uniqueTopics} />
    </main>
  );
}

export const revalidate = 601;
