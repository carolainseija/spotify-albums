import { Card, Col, Row, Skeleton } from "antd";

function Columns() {
  return (
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
        style={{
          width: "auto",
          margin: "10px 0px",
        }}
      >
        <Skeleton />
      </Card>
    </Col>
  );
}

function SkeletonRow() {
  return (
    <Row>
      <Columns />
      <Columns />
      <Columns />
    </Row>
  );
}

export default function SkeletonLoad() {
  return (
    <>
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </>
  );
}
