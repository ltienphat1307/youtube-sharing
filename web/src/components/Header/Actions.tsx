import React, { memo, useEffect } from "react";
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
import { SCREEN_SIZE } from "../styled-variables";

const Styled = styled.div`
  display: flex;
  align-items: center;

  .btn-share {
    margin: 0 15px;
  }

  @media screen and (max-width: ${SCREEN_SIZE.tablet}) {
    flex-direction: column;

    button,
    div {
      margin: 15px 0;
    }
  }
`;

interface Props {
  user: IUser;
}

function handleNotification(user: IUser) {
  const socket = initSocket();
  console.log("handleNotification");
  socket.on("send-shared-movie", (newMovie: IMovie) => {
    if (user.id != newMovie.sharedByUser.id) {
      toast.success(newMovie);
    }
  });
}

let hasEnabledListener = false;

const Actions: React.FC<Props> = ({ user }) => {
  const [logout] = useMutation(LOG_OUT);

  useEffect(() => {
    if (!hasEnabledListener) {
      handleNotification(user);
      hasEnabledListener = true;
    }
  }, []);

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
    <Styled className="actions">
      <div>Welcome {user.email}</div>
      <PrimaryButton className="btn-share" onClick={shareMovie}>
        Share a move
      </PrimaryButton>
      <PrimaryButton onClick={onLogout}>Logout</PrimaryButton>
    </Styled>
  );
};

export default memo(Actions);
