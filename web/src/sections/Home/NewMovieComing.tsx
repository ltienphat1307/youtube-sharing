import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { IUser } from "../../types/IUser";
import { initSocket } from "../../socket";
import { toast } from "../../components/Toast";
import { IMovie } from "../../types/IMovie";
import { ME } from "../../apollo/graphql/useAuth";

function handleNotification(user: IUser, refetchMovie: any) {
  const socket = initSocket();

  socket.on("send-shared-movie", (newMovie: IMovie) => {
    if (user.id != newMovie.sharedByUser.id) {
      toast.shareVideoSuccess(newMovie);
      refetchMovie();
    }
  });
}

interface Props {
  refetchMovie: any;
}

export const NewMovieComing: React.FC<Props> = ({ refetchMovie }) => {
  const getMeResp = useQuery(ME);
  const user = getMeResp.data && getMeResp.data.me;

  useEffect(() => {
    if (user) {
      handleNotification(user, refetchMovie);
    }
  }, [user]);

  return <></>;
};
