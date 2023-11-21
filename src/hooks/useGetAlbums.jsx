import { useState } from "react";

export default function useGetAlbums() {
  const [albumsArtist, setAlbumsArtist] = useState([]);
  const [artistName, setArtisName] = useState("");

  let token = window.localStorage.getItem("access_token");

  async function getArtistForName(value) {
    setArtisName(value);
    const url = `https://api.spotify.com/v1/search?q=artist%3A${value.replace(" ","%20")}&type=artist`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" + " " + token },
    });
    const data = await response.json();
    const { artists } = data;
    const albumss = await getAlbumsForArtist(artists.items[0].id);
    return albumss;
  }

  const getAlbumsForArtist = async (artistID) => {
    const url = `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&offset=0`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      const data = await response.json();
      const { items } = data;
      return items;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return {
    getArtistForName,
    albumsArtist,
    setAlbumsArtist,
    artistName,
  };
}
