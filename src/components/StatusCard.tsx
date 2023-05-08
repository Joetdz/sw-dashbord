import React from "react";
import { Stack, Button, Text } from "@mantine/core";

type Props = {
  text: string;
//   label: string;
  count: number;
};

const StatusCard = ({ text, count }: Props) => {
  return (
    <Stack
      h={100}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
                  : theme.colors.gray[0],
          
          width: "30%",
          marginRight: "1em",
          padding: "1em",
          borderRadius: "1.4em"
          })
          
          }>
      {/* <Text>{label}</Text> */}
      <Text>{text}</Text>
      <Text>{count}</Text>
    </Stack>
  );
};

export default StatusCard;
