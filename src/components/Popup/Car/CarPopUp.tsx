import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  content: JSX.Element | JSX.Element[];
  open: any;
  close: any;
  opened: any;
};

export const CarPopup = ({ title, content, opened, open, close }: Props) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        fullScreen={windowSize[0] <= 700 ? true : isMobile}
        transitionProps={{ transition: "fade", duration: 200 }} 
        zIndex={99}
        >
        {content}
      </Modal>
    </>
  );
};

export default CarPopup;
