import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

type BrandIconProps = Partial<IconProps>;

export const EpamSystems = (props: BrandIconProps) => (
  <Icon icon="tabler:code" {...props} />
);

export const FreeCodeCamp = (props: BrandIconProps) => (
  <Icon icon="simple-icons:freecodecamp" {...props} />
);

export const AWS = (props: BrandIconProps) => (
  <Icon icon="logos:aws" {...props} />
);
