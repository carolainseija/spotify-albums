import { Col, Row, Layout, Input, List, Typography } from "antd";
import "./theme.less";
import { Header } from "antd/es/layout/layout";
import ContentAlbums from "./components/albums";
import logo from "./assets/logo.png";
const { Search } = Input;

const App = () => {
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
          </Layout>
        </Col>
        <Col xs={24} sm={24} md={12} lg={18} xl={18} className="content">
          <Header className="header">
            <Search
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
export default App;
