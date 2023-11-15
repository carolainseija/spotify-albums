import { Col, Flex, Input, Row, Button } from "antd";
import logo from "./assets/logo.png";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

const Login = () => {
  const { user } = useContext(UserContext);
  
  return (
    <Row Flex justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={8} style={{ height: "50vh" }}>
        <Flex gap="middle" vertical>
          <img src={logo} alt="logo" className="logo" />
          <h1 style={{ color: "white", textAlign: "center" }}>
            Escucha música sin limites.
          </h1>
          <Button className="buttonGreen" size="large">
            Iniciar sesión
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;
