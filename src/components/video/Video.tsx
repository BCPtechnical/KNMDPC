import styled from 'styled-components';

const StyledIframe = styled.video`
  pointer-events: none;
`;

function Video({
  videoSrcURL,
  videoTitle,
  style,
}: {
  videoSrcURL: string;
  videoTitle: string;
  style: any;
}) {
  return (
    <div className="video">
      <StyledIframe
        style={style}
        src={videoSrcURL}
        title={videoTitle}
        loop
        autoPlay
        muted
        controls={false}
      />
    </div>
  );
}
export default Video;
