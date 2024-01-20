import React from 'react'
import {
    UnstyledButton,
    Group,
    Text,
    Center,
} from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons-react";
import { useStyles } from '../../lib/utils';
import { ThProps } from '../../lib/types'

export const TableHeader = ({ children, reversed, sorted, onSort }: ThProps) => {
    const { classes } = useStyles();
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export default TableHeader