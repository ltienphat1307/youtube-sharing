import fetch from "node-fetch";
import { constants } from "../constants";
import { removeSpecialCharacters } from "./stringHandler";

const googleapis = "https://www.googleapis.com/youtube/v3/videos";

interface YoutubeInfoResponse {
  items: [
    {
      snippet: {
        title: string;
        description: string;
      };
    }
  ];
}

function youtubeParser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export const getYoutubeInfo = async (url: string) => {
  const videoId = youtubeParser(url);
  let uri = `${googleapis}?part=snippet&id=${videoId}&fields=items/snippet/title,items/snippet/description`;
  uri += `&key=${constants.ggApiKey}`;

  const response = await fetch(uri);
  const body = (await response.json()) as YoutubeInfoResponse;
  const snippet = body.items[0].snippet;

  return {
    videoId,
    title: snippet.title,
    description: removeSpecialCharacters(snippet.description),
  };
};
