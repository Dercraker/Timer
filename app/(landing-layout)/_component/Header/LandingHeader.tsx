'use client';

import { SiteName } from '@/components/layout/SiteName';
import type { NavigationLink } from '@/types/NavigationLink.schema';
import { HEADER_LINKS } from '@/utils/NavigationLinks';
import { AppShell, Group, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import styles from './Header.module.css';

const LandingHeader = () => {
  const links = HEADER_LINKS.map((link: NavigationLink) => {
    return (
      <UnstyledButton
        p="xs"
        key={link.label}
        className={styles.control}
        component={Link}
        href={link.href}
      >
        <Group gap="3px">
          {link.icon}
          {link.label}
        </Group>
      </UnstyledButton>
    );
  });

  return (
    <AppShell.Header>
      <Group h="100%" justify="space-between" px="md">
        <Group>
          <SiteName />
        </Group>
        <Group>
          <Group gap="0">{links}</Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default LandingHeader;
