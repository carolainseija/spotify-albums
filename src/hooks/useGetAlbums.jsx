import { useState } from "react";

export default function useGetAlbums() {
  const [artistName, setArtisName] = useState("");

  let token =
    "BQBJ6N6iXW0ZQhTePqXgmurOOHChSrQWFjqQFwzIJCGc3X4OtjT5fwu4Dk5mhPndKG0hk9mXOjSy2n5Dc-8FtWFH_JudBCDVmWBrPgg-2Wr3v_rbLxB6qKT9gefHvcBAkzYxlb7vCM2xvAYtQd2Ab8nEIvLH84E6kQ1qe4j3SWO-LAM7H-vhb8p1aSEv9arKzx4ZuFJfH_R6utFnNZB3JA";

  async function getArtistForName(value) {
    setArtisName(value);
    try {
      const url = `https://api.spotify.com/v1/search?q=artist%3A${value.replace(" ", "%20")}&type=artist`;
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: "Bearer" + " " + token },
      });

      if (response.status === 200) {
        const data = await response.json();
        const { artists } = data;
        const albums = await getAlbumsForArtist(artists.items[0].id);
        return albums;
      }
      throw new Error(response.status);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const getAlbumsForArtist = async (artistID) => {
    const url = `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&offset=0`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: "Bearer" + " " + token },
      });

      if (response.status === 200) {
        const data = await response.json();
        const { items } = data;
        return items;
      }
      throw new Error(response.status);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    getArtistForName,
    artistName,
  };
}
