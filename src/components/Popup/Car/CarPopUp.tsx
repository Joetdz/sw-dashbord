import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";

type Props = {
  title: string;
  content: JSX.Element | JSX.Element[];
  open: any;
  close: any;
  opened: any;
};

export const CarPopup = ({ title, content, opened, open, close }: Props) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}>
        {content}
      </Modal>
    </>
  );
};

export default CarPopup;
