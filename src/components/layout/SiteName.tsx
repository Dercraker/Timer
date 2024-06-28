'use client';

import { LINKS } from '@/utils/NavigationLinks';
import { SiteConfig } from '@/utils/site-config';
import type { MantineBreakpoint } from '@mantine/core';
import { Box, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { ClockIcon } from '../icons/clockIcon';

export type SiteNameProps = {
  nameVisibleFrom?: MantineBreakpoint;
  logoSize?: number;
};

export const SiteName = ({
  nameVisibleFrom = 'xs',
  logoSize = 24,
}: SiteNameProps) => {
  const [hovered, { open: openHoverClock, close: closeHoverClock }] =
    useDisclosure(false);

  return (
    <Box
      component={Link}
      href={LINKS.Landing.Landing.href}
      td="inherit"
      c="inherit"
      onMouseEnter={openHoverClock}
      onMouseLeave={closeHoverClock}
    >
      <Group gap="xs">
        <ClockIcon
          size={logoSize}
          isHover={hovered}
          colorize="var(--mantine-color-text)"
        />
        <Title
          ta="center"
          order={3}
          tt="uppercase"
          visibleFrom={nameVisibleFrom}
        >
          {SiteConfig.title}
        </Title>
      </Group>
    </Box>
  );
};
