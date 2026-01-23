import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

type AboutMeIconProps = Partial<IconProps>;

export const AboutMeIcon = (props: AboutMeIconProps) => (
  <Icon icon="mdi:account-circle-outline" {...props} />
);

export const MexicanFlagIcon = (props: AboutMeIconProps) => (
  <Icon icon="twemoji:flag-for-flag-mexico" {...props} />
);

export const CakeIcon = (props: AboutMeIconProps) => (
  <Icon icon="mingcute:cake-fill" {...props} />
);
