import { Col, Row, Card, Skeleton, Empty, Flex, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import "./albums.less";

const ContentAlbums = ({ albums, artist, loading }) => {
  return (
    <Card bordered={false} className="contentCards">
      {loading === true ? (
        <Row>
          <Card>
            <Skeleton />
          </Card>
          <Card>
            <Skeleton />
          </Card>
          <Card>
            <Skeleton />
          </Card>
        </Row>
      ) : (
        <>
          {albums.length === 0 ? (
            <Flex
              gap="middle"
              vertical
              justify="center"
              align="center"
              style={{ height: "80vh" }}
            >
              <Empty description="¡Hasta ahora no se han realizado búsquedas de álbums por artistas!" />
              <h3>¡Busca por el nombre de tu artista favorito!</h3>
            </Flex>
          ) : (
            <>
              <Row>
                <h1>Resultados de la búsqueda: álbumes de {artist}</h1>
              </Row>
              <Row>
                {albums?.map((album) => (
                  <>
                    <Col
                      xs={{
                        span: 24,
                        offset: 1,
                      }}
                      lg={{
                        span: 6,
                        offset: 1,
                      }}
                    >
                      <Card
                        hoverable
                        style={{
                          width: "auto",
                          margin: "10px 0px",
                        }}
                        cover={<img src={album.images[1].url} />}
                      >
                        <Meta title={album.name} description={album.name} />
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
              <Row>
                <Pagination
                  current={10}
                  onChange={(page) => console.log("page", page)}
                  total={10}
                />
              </Row>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default ContentAlbums;
