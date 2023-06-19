import React from "react";
import styled from "styled-components";

import { IMovie } from "../../types/IMovie";

const Styled = styled.div`
  display: flex;
  margin-bottom: 30px;

  .video-wrapper {
    flex: 1 0 400px;
    height: 300px;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  .info-wrapper {
    padding-left: 50px;
    width: 100%;
    height: 300px;

    .label {
      font-weight: 700;
    }

    .title {
      color: #ba0a0a;
      font-size: 20px;
    }

    .shared-by {
      margin: 5px 0;

      .user-email {
        font-style: italic;
      }
    }

    .description-content {
      overflow: hidden;
      max-height: 192px;
      line-height: 32px;
    }
  }
`;

interface Props {
  movie: IMovie;
}

export const MovieItem: React.FC<Props> = ({ movie }) => {
  const src = `https://www.youtube.com/embed/${movie.videoId}?feature=oembed`;

  return (
    <Styled>
      <div className="video-wrapper">
        <iframe
          width="200"
          height="113"
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="info-wrapper">
        <div className="title">{movie.title}</div>
        <div className="shared-by">
          <span className="label">Shared by: </span>
          <span className="user-email">{movie.sharedByUser.email}</span>
        </div>
        <div className="description">
          <div className="label">Description:</div>
          <div className="description-content">{movie.description}</div>
        </div>
      </div>
    </Styled>
  );
};
