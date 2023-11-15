import { Col, Row, Card } from "antd";
import Meta from "antd/es/card/Meta";
import './albums.less';

const ContentAlbums = () => {
  const albums = [
    {
      title: "Tini - Martina Stoessel",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b2738cb0bced19cec869749b2949",
    },
    {
      title: "Cupido",
      description: "Album de Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67706c0000da84410935984cb61373fd95cb35",
    },
    {
      title: "Quiero Volver",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d00001e028e629e5f0576774aee22a4af",
    },
    {
      title: "TINI TINI TINI",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b273391cf1c36cd41b526e691c41",
    },
    {
      title: "La Triple T",
      description: "Album de Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b2735ef3fecb30db2bcbc1ca78c7",
    },
    {
      title: "El último beso",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d00001e02a1c9eb3d636a682619591c7e",
    },
    {
      title: "Tini - Martina Stoessel",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b2738cb0bced19cec869749b2949",
    },
    {
      title: "Cupido",
      description: "Album de Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67706c0000da84410935984cb61373fd95cb35",
    },
    {
      title: "Quiero Volver",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d00001e028e629e5f0576774aee22a4af",
    },
    {
      title: "Tini - Martina Stoessel",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b2738cb0bced19cec869749b2949",
    },
    {
      title: "Cupido",
      description: "Album de Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67706c0000da84410935984cb61373fd95cb35",
    },
    {
      title: "Quiero Volver",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d00001e028e629e5f0576774aee22a4af",
    },
    {
      title: "Tini - Martina Stoessel",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d0000b2738cb0bced19cec869749b2949",
    },
    {
      title: "Cupido",
      description: "Album de Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67706c0000da84410935984cb61373fd95cb35",
    },
    {
      title: "Quiero Volver",
      description: "Album Tini",
      alt: "imagen de portada del álbum",
      src: "https://i.scdn.co/image/ab67616d00001e028e629e5f0576774aee22a4af",
    },
  ];

  return (
    <Card bordered={false} className="contentCards">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1>Resultados de la búsqueda: "Álbums de Tini"</h1>
      <Row>
        {albums.map((album) => (
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
                cover={<img alt={album.alt} src={album.src} />}
              >
                <Meta title={album.title} description={album.description} />
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </Card>
  );
};

export default ContentAlbums;
