import { SiteConfig } from '@/utils/site-config';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandGithub, IconMail } from '@tabler/icons-react';
import { SiteName } from '../SiteName';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.afterFooter}>
        <div className={styles.logo}>
          <SiteName logoSize={30} />
          <Text size="xs" c="dimmed" className={styles.description}>
            {SiteConfig.description}
          </Text>
        </div>
        <Text c="dimmed" size="sm">
          © 2024 {SiteConfig.title} All rights reserved.
        </Text>

        <Group
          gap={0}
          className={styles.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconMail stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
