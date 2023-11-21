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
import { useState } from "react";
import useGetAlbums from "./hooks/useGetAlbums";
const { Search } = Input;

const Home = () => {
  const [loadingAlbums, setLoadingAlbums] = useState(null);
  const [albumsArtist, setAlbumsArtist] = useState([]);
  const { getArtistForName, artistName } = useGetAlbums();

  const listDrawer = [
    "Inicio",
    "Buscar",
    "Tu biblioteca",
    "Crear lista de reproducción",
    "Favoritos",
  ];

  let token = "BQBJ6N6iXW0ZQhTePqXgmurOOHChSrQWFjqQFwzIJCGc3X4OtjT5fwu4Dk5mhPndKG0hk9mXOjSy2n5Dc-8FtWFH_JudBCDVmWBrPgg-2Wr3v_rbLxB6qKT9gefHvcBAkzYxlb7vCM2xvAYtQd2Ab8nEIvLH84E6kQ1qe4j3SWO-LAM7H-vhb8p1aSEv9arKzx4ZuFJfH_R6utFnNZB3JA"

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
            
            throw new Error(`${albumResponse.status}`);
         
          } catch (error) {
            console.error(error.message);
            return album;
          }
        })
      );
      const sortedAlbums = results.sort((a, b) => b.popularity - a.popularity);
      setAlbumsArtist(sortedAlbums);
      setLoadingAlbums(false);
    } catch (error) {
      console.error(error.message);
      setLoadingAlbums(false);
    }
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
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
        <Col xs={24} sm={24} md={12} lg={18} xl={18} className="content">
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
