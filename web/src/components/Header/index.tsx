import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import logoImg from "../../images/icons/house.svg";
import { SCREEN_SIZE } from "../styled-variables";
import { Link } from "../Link";
import { ME } from "../../apollo/graphql/useAuth";
import Actions from "./Actions";

const Styled = styled.div`
  width: 100%;
  height: 65px;

  .header-content {
    padding: 0 15px;
    display: flex;
    align-items: center;
    max-width: 1280px;
    margin: auto;
    border-bottom: 2px solid black;
    height: 100%;

    .logo-wrapper {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #2b2a2a;

        img {
          width: 60px;
          height: 100%;
          object-fit: cover;
        }

        span {
          font-size: 30px;
          margin-left: 15px;
        }
      }
    }

    .action-wrapper {
      margin-left: auto;
    }
  }

  @media screen and (max-width: ${SCREEN_SIZE.tablet}) {
  }
`;

interface IUser {
  id: number;
  email: string;
}

const Header: React.FC = () => {
  const getMeResp = useQuery(ME, { fetchPolicy: "cache-and-network" });
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (getMeResp) {
      console.log(getMeResp);
      setUser(getMeResp.data && getMeResp.data.me);
    }
  }, [getMeResp]);

  if (!getMeResp.called || getMeResp.loading) {
    return null;
  }

  return (
    <Styled>
      <div className="header-content">
        <div className="logo-wrapper">
          <a href="/" className="logo">
            <img src={logoImg} />
            <span>Funny Movie</span>
          </a>
        </div>
        <div className="action-wrapper">
          {user ? (
            <Actions user={user} />
          ) : (
            <>
              <Link href="/sign-up">Sign up</Link>|
              <Link href="/login">Log in</Link>
            </>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default Header;
