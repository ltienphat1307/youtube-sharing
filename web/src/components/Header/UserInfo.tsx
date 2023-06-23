import React, { memo } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";

import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { LOG_OUT, ME } from "../../apollo/graphql/useAuth";
import { PrimaryButton } from "../Button/PrimaryButton";
import { IUser } from "../../types/IUser";
import { SCREEN_SIZE } from "../styled-variables";
import { NewMovieComing } from "./NewMovieComing";

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

const UserInfo: React.FC<Props> = ({ user }) => {
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
    <Styled className="user-info">
      <NewMovieComing />
      <div>Welcome {user.email}</div>
      <PrimaryButton className="btn-share" onClick={shareMovie}>
        Share a move
      </PrimaryButton>
      <PrimaryButton onClick={onLogout}>Logout</PrimaryButton>
    </Styled>
  );
};

export default memo(UserInfo);
