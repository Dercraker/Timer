'use client';

import { Player } from '@lordicon/react';
import { useRef } from 'react';

import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ICON from '@public/assets/system-regular-67-clock.json';

type ClockIconProps = {
  onClick?: () => void;

  isHover?: boolean;
  loop?: boolean;
  size?: number;
  colorize?: string;
  disabled?: boolean;
};
export const ClockIcon = ({
  onClick,
  isHover,
  size = 32,
  loop,
  colorize,
  disabled,
}: ClockIconProps) => {
  const [hovered, { open: openHover, close: closeHover }] =
    useDisclosure(false);

  const playerRef = useRef<Player>(null);

  if ((isHover || hovered) && !playerRef.current?.isPlaying)
    playerRef.current?.playFromBeginning();

  const handleComplete = () => {
    if ((isHover || hovered) && loop) playerRef.current?.playFromBeginning();
  };

  return (
    <ActionIcon
      variant="transparent"
      onMouseEnter={!isHover ? openHover : () => {}}
      onMouseLeave={() => closeHover}
      onClick={onClick}
      disabled={disabled}
    >
      <Player
        ref={playerRef}
        icon={ICON}
        size={size}
        onComplete={handleComplete}
        colorize={
          disabled
            ? 'var(--mantine-color-grey-5)'
            : colorize || 'var(--mantine-primary-color-3)'
        }
      />
    </ActionIcon>
  );
};
