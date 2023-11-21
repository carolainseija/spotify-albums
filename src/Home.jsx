/* eslint-disable react-hooks/exhaustive-deps */
import {
  Col,
  Row,
  Layout,
  Input,
  List,
  Typography,
  Button,
  Card,
} from "antd";
import "./theme.less";
import { Header } from "antd/es/layout/layout";
import ContentAlbums from "./components/albums";
import logo from "./assets/logo.png";
import { useEffect, useState } from "react";
import useGetAlbums from "./hooks/useGetAlbums";
const { Search } = Input;

const Home = () => {
  const [loadingAlbums, setLoadingAlbums] = useState(null);

  const { getArtistForName, albumsArtist, artistName, setAlbumsArtist } = useGetAlbums();
  let clientId = "ffe30f6fa76e49a8bc17153064c99a7f";

  const saveToken = async () => {
    const redirectUri = "http://localhost:5173/home";
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    await localStorage.setItem("access_token", response.access_token);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      saveToken();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const listDrawer = [
    "Inicio",
    "Buscar",
    "Tu biblioteca",
    "Crear lista de reproducción",
    "Favoritos",
  ];

  let token = window.localStorage.getItem("access_token");

  const searchAlbums = async (value) => {
    try {
      setLoadingAlbums(true);
      const albumsForArtist = await getArtistForName(value);

      const results = await Promise.all(
        albumsForArtist.map(async (album) => {
          const albumUrl = `https://api.spotify.com/v1/albums/${album.id}`;
          try {
            const albumResponse = await fetch(albumUrl, {
              method: "GET",
              headers: { Authorization: "Bearer" + " " + token },
            });

            if (albumResponse.status === 200) {
              const albumData = await albumResponse.json();
              const popularity = albumData.popularity;
              return { ...album, popularity };
            }
            throw new Error(albumResponse.status);
         
          } catch (error) {
            console.error("Error", error.message);
            return album;
          }
        })
      );

      const sortedAlbums = results.sort((a, b) => b.popularity - a.popularity);
      setAlbumsArtist(sortedAlbums);
      setLoadingAlbums(false);
    } catch (error) {
      console.error(error);
      setLoadingAlbums(false);
    }
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={7} xl={6}>
          <Layout direction="vertical" className="homeContent">
            <img src={logo} alt="logo" className="logo" />
            <List
              className="list"
              dataSource={listDrawer}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <Typography.Text className="listItems">
                    {item}
                  </Typography.Text>
                </List.Item>
              )}
            />
            <Card
              style={{
                width: 300,
                margin: "16px auto",
              }}
            >
              <Typography.Title level={5}>
                Crea tu propia Playlist
              </Typography.Title>
              <Typography.Paragraph>Es muy fácil</Typography.Paragraph>
              <Button className="buttonGreen" size="large">
                + Crear PlayList
              </Button>
            </Card>
          </Layout>
        </Col>
        <Col xs={24} sm={24} md={12} lg={17} xl={18} className="content">
          <Header className="header">
            <Search
              className="search"
              placeholder="Buscar álbum por nombre de artista"
              onSearch={(value) => searchAlbums(value)}
              allowClear
            />
          </Header>
          <ContentAlbums
            albums={albumsArtist}
            loading={loadingAlbums}
            artist={artistName}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
