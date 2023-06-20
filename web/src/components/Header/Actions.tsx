import React, { memo } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";

import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { LOG_OUT, ME } from "../../apollo/graphql/useAuth";
import { PrimaryButton } from "../Button";
import { IUser } from "../../types/IUser";
import { IMovie } from "../../types/IMovie";
import { initSocket } from "../../socket";
import { toast } from "../Toast";

const Styled = styled.div`
  display: flex;
  align-items: center;

  .btn-share {
    margin: 0 15px;
  }
`;

interface Props {
  user: IUser;
}

function handleNotification() {
  const socket = initSocket();
  socket.on("send-shared-movie", (newMovie: IMovie) => {
    toast.success(newMovie);
  });
}

handleNotification();

const Actions: React.FC<Props> = ({ user }) => {
  const [logout] = useMutation(LOG_OUT);

  function shareMovie() {
    navigate("/share");
  }

  async function onLogout() {
    try {
      await logout({ refetchQueries: [{ query: ME }] });
      navigate("/login");
    } catch (e) {
      const err = catchGraphqlError(e);
      console.log(err);
    }
  }

  return (
    <Styled>
      <div>Welcome {user.email}</div>
      <PrimaryButton className="btn-share" onClick={shareMovie}>
        Share a move
      </PrimaryButton>
      <PrimaryButton onClick={onLogout}>Logout</PrimaryButton>
    </Styled>
  );
};

export default memo(Actions);
