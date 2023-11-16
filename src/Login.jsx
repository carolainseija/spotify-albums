import { Col, Flex, Row, Button } from "antd";
import logo from "./assets/logo.png";
import useLoginSpotify from "./hooks/useLoginSpotify";

const Login = () => {
  const { generateCode } = useLoginSpotify();

  return (
    <Row Flex justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={8} style={{ height: "50vh" }}>
        <Flex gap="middle" vertical>
          <img src={logo} alt="logo" className="logo" />
          <h1 style={{ color: "white", textAlign: "center" }}>
            Escucha música sin limites.
          </h1>
          <Button className="buttonGreen" size="large" onClick={generateCode}>
            Iniciar sesión
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;
