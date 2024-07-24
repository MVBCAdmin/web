import ReactPlayer from "react-player";
import classes from "./VideoPlayer.module.scss";

export default function VideoPlayer(contentModule) {
  const { title, showTitle, videoUrl, video, videoWidth } =
    contentModule.contentModule;
  return (
    <section className={classes.oVideoPlayer}>
      {showTitle ? (
        <div className={`${classes.oContainer} container`}>
          <div className={`${classes.oRow} row`}>
            <div className={`${classes.oCol} col`}>
              <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={classes.mVideo}
        style={{
          maxWidth: videoWidth,
        }}
      >
        {videoUrl ? (
          <ReactPlayer url={videoUrl} width="100%" height="100%" />
        ) : (
          <ReactPlayer url={video} width="100%" height="100%" />
        )}
      </div>
    </section>
  );
}
