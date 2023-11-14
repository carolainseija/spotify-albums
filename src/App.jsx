import { Flex } from "antd";
import './theme.less';

const App = () => {
  return (
    <Flex gap="middle" align="start" vertical>
      <Flex justify="center" align="center">
        <h3  className="title-typography">Spotify Albums</h3>
      </Flex>
    </Flex>
  );
};

export default App;
