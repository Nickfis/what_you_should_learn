import Table from "../components/Table";
import connectToDb from "@/utils/connectToDb";

export default async function Home() {
  const client = await connectToDb();
  const res =
    await client.query(`select view_count / expected_views as ratio, title_on_youtube as title, * from videos
    order by ratio desc
    LIMIT 50`);

  const videos = res.rows;
  client.end();

  return (
    <main>
      <h2 className="mb-xs">Top 50 Outstanding Lectures</h2>
      <p className="mb-xl">
        Lectures that have been watched a lot more times than our model would
        have thought.
      </p>
      <Table type="outstandingLectures" data={videos} />
    </main>
  );
}

export const revalidate = 601;
