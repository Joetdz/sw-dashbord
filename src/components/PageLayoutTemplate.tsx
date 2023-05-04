import React from "react";
import { Container } from "@mantine/core";

type Props = {
  children: JSX.Element | JSX.Element[];
};
const PageLayoutTemplate = ({ children }: Props) => {
  return (
    <Container
      fluid={true}
      style={{ width: "100%" }}
      size="xl"
      className="page__layout--template">
      {children}
    </Container>
  );
};

export default PageLayoutTemplate;
