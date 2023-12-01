import { useState, useEffect } from "react";
import getEnv from "./env";

import { getMyTopTracks, getAlbumTracks } from "./apiOptions";

const { ALBUM_ID } = getEnv();

const useSpotifyTracks = (token) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //const response = await getMyTopTracks(token);
      //const variable_type = typeof response;
      //console.log(variable_type);
      setTracks(await getMyTopTracks(token));
    };
    if (token !== null) {
      fetchData();
    }
  }, [token]);

  return tracks;
};

export default useSpotifyTracks;
