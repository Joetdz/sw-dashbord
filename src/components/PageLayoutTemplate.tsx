import React, { useEffect, useState } from "react";
import { Container } from "@mantine/core";

type Props = {
  children: JSX.Element | JSX.Element[];
};
const PAGE_SIZES = [10, 15, 20];
const PageLayoutTemplate = ({ children }: Props) => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [page, setPage] = useState(1);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return (
    <Container
      fluid={true}
      style={{ width: `${windowSize[0]} <= 768` ? "70%" : "90%", position: "relative", left: `${windowSize[0]} <= 768` ? "2%" : "10%" }}
      size="xl"
      className="page__layout--template">
      {children}
    </Container>
  );
};

export default PageLayoutTemplate;
