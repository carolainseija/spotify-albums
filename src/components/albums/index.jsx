/* eslint-disable react/prop-types */
import { Col, Row, Card, Empty, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import "./albums.less";
import SkeletonLoad from "../Skeleton/SkeletonLoad";

const ContentAlbums = ({ albums, artist, loading }) => {
  return (
    <Card bordered={false} className="contentCards">
      {loading === true ? (
        <SkeletonLoad />
      ) : (
        <>
          {albums?.length === 0 || albums === undefined ? (
            <Flex
              gap="middle"
              vertical
              justify="center"
              align="center"
              style={{ height: "80vh" }}
            >
              <Empty
                description={
                  artist == ""
                    ? "¡Hasta ahora no se han realizado búsquedas de álbums!"
                    : `Has buscado por ${artist}`
                }
              />
              <h3>
                {artist == ""
                  ? "¡Busca por el nombre de tu artista favorito!"
                  : "Lo sentimos, no hemos encontrado albumes para este artista"}
              </h3>
            </Flex>
          ) : (
            <>
              <Row>
                <h1>Resultados de la búsqueda: álbumes de {artist}</h1>
              </Row>
              <Row>
                {albums.map((album) => (
                  <>
                    <Col
                      key={album.id}
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
                        key={album.id}
                        hoverable
                        style={{
                          width: "auto",
                          margin: "10px 0px",
                        }}
                        cover={<img src={album.images[1].url} />}
                      >
                        <Meta
                          title={album.name}
                          description={`Tipo: ${album.type} / Popularidad: ${album.popularity}`}
                        />
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default ContentAlbums;
