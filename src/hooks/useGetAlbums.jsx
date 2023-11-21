import { useState } from "react";

export default function useGetAlbums() {
  const [albumsArtist, setAlbumsArtist] = useState([]);
  const [artistName, setArtisName] = useState("");

  let token = window.localStorage.getItem("access_token");

  const popularyAlbums = async (albumId) => {
    const url = `https://api.spotify.com/v1/albums/${albumId}`;
    const response = fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" + " " + token },
    });

    const data = (await response).json();
    const { popularity } = await data;

    setAlbumsArtist((prev) => {
      return prev.map((alb) => {
        if (alb.id === albumId) {
          return { ...alb, popularity: popularity };
        }
        return alb;
      });
    });

    return popularity;
  };


  async function getArtistForName(value) {
    setArtisName(value);
    const url = `https://api.spotify.com/v1/search?q=artist%3A${value}&type=artist`;
    const response = fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" + " " + token },
    });

    const data = await (await response).json();
    console.log("daaa", data)
    const { artists } = data;
    await getAlbumsForArtist(artists.items[0].id);
    return data;
  }



  const getAlbumsForArtist = async (artistID) => {
    const url = `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&offset=0`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" + " " + token },
    });
    const data = await response.json();
    const { items } = data;
    setAlbumsArtist(items);
    return items;
  };


  return {
    getArtistForName,
    albumsArtist,
    setAlbumsArtist,
    artistName,
    popularyAlbums,
  };
}
