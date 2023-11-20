import { useState } from "react";

export default function useGetAlbums() {
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [albumsArtist, setAlbumsArtist] = useState([]);
  const [artist, setArtist] = useState("");

  async function getAlbumsArtist(value) {
    setLoadingAlbums(true);

    const token = window.localStorage.getItem("access_token");
    setArtist(value);

    const url = `https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3A${artist}&type=album&limit=10`;
    const response = fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" + " " + token },
    });

    const datos = await (await response).json();
    const { albums } = datos;
    
    setAlbumsArtist(albums.items);
    setLoadingAlbums(false);

    return datos;
  }

  return {
    getAlbumsArtist,
    loadingAlbums,
    artist,
    albumsArtist,
  };
}
