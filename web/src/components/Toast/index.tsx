import React from "react";
import { ToastContainer, toast as reactToast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { IMovie } from "../../types/IMovie";

interface Props {
  movie: IMovie;
}

const Styled = styled.div`
  .title {
    height: 38px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .shared-by {
    font-style: italic;
  }
`;

const Message: React.FC<Props> = ({ movie }) => {
  return (
    <Styled>
      <div className="title">{movie.title}</div>
      <div className="shared-by">shared by: {movie.sharedByUser.email}</div>
    </Styled>
  );
};

export const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const toast = {
  ...reactToast,
  shareVideoSuccess: (movie: IMovie) => {
    reactToast.success(<Message movie={movie} />);
  },
};
