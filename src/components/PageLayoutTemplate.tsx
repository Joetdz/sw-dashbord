import React from "react";
import { Container } from "@mantine/core";

type Props = {
  children: JSX.Element | JSX.Element[];
};
const PageLayoutTemplate = ({ children }: Props) => {
  return (
    <Container
      fluid={true}
      style={{ width: "100%", position: "relative", left: "10%" }}
      size="xl"
      className="page__layout--template">
      {children}
    </Container>
  );
};

export default PageLayoutTemplate;
