import { formatDate } from "@/utils/dateFunctions";

const Lecture = ({ video, withFactor = false }) => {
  return (
    <li className="table__row">
      <img src={`https://img.youtube.com/vi/${video.video_id}/default.jpg`} />
      <a
        target="_blank"
        href={`https://youtube.com/watch?v=${video.video_id}`}
        className="table__video-content"
      >
        <h4 className="table__row-headline">{video.title}</h4>

        {withFactor ? (
          <p className="table__row-date">
            {Math.round(video.view_count / video.expected_views) - 1}x more
            views than expected
          </p>
        ) : (
          <p className="table__row-date">{formatDate(video.publishing_date)}</p>
        )}
      </a>
      <div className="table__row-views">
        <p>Views:</p>
        <p
          className={
            video.expected_views < video.view_count
              ? "table__row-views--green"
              : null
          }
        >
          {Math.round(video.view_count).toLocaleString()}
        </p>
      </div>
      <div className="table__row-views">
        <p>Expected Views:</p>
        <p>{Math.round(video.expected_views).toLocaleString()}</p>
      </div>
    </li>
  );
};

export default Lecture;
