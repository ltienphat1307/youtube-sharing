import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";

import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { LOG_OUT, ME } from "../../apollo/graphql/useAuth";
import { PrimaryButton } from "../Button";

const Styled = styled.div`
  display: flex;
  align-items: center;

  .btn-share {
    margin: 0 15px;
  }
`;

interface IUser {
  id: number;
  email: string;
}

interface Props {
  user: IUser;
}

const Actions: React.FC<Props> = ({ user }) => {
  const [logout] = useMutation(LOG_OUT);

  function shareMovie() {
    navigate("/share-movie");
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

export default Actions;
