import {
  Col,
  Row,
  Layout,
  Input,
  List,
  Typography,
  Button,
  Card,
  Avatar,
  Flex,
} from "antd";
import "./theme.less";
import { Header } from "antd/es/layout/layout";
import ContentAlbums from "./components/albums";
import logo from "./assets/logo.png";
import { PlusOutlined, PoweroffOutlined } from "@ant-design/icons";
import useNameInitial from "./hooks/useNameInitial";
import useLoginSpotify from "./hooks/useLoginSpotify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";

const { Search } = Input;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { getUser } = useLoginSpotify();

  useEffect(() => {
    try {
      getUser().finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }, [getUser]);

  const listDrawer = [
    "Inicio",
    "Buscar",
    "Tu biblioteca",
    "Crear lista de reproducción",
    "Favoritos",
  ];

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Layout direction="vertical" className="homeContent">
            <img src={logo} alt="logo" className="logo" />
            {!loading && (
              <>
                <Flex
                  gap="middle"
                  horizontal
                  justify="flex-start"
                  align="flex-start"
                >
                  <Typography.Title
                    level={5}
                    style={{ color: "white", marginLeft: "70px" }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                        color: "#FFF",
                        marginRight: 5,
                      }}
                    >
                      {useNameInitial(user)}
                    </Avatar>
                    {user}
                  </Typography.Title>
                  <PoweroffOutlined />
                </Flex>
              </>
            )}
            <List
              className="list"
              dataSource={listDrawer}
              renderItem={(item) => (
                <List.Item>
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
              <Button
                className="buttonGreen"
                icon={<PlusOutlined />}
                size="large"
              >
                Crear PlayList
              </Button>
            </Card>
          </Layout>
        </Col>
        <Col xs={24} sm={24} md={12} lg={18} xl={18} className="content">
          <Header className="header">
            <Search
              className="search"
              placeholder="Buscar álbum por nombre de artista"
              onSearch={(value) => console.log(value)}
            />
          </Header>
          <ContentAlbums />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
