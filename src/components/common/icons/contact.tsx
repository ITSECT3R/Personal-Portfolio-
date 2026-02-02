import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

type ContactIconProps = Partial<IconProps>;

export const PhoneIcon = (props: ContactIconProps) => (
  <Icon icon="mdi:phone-outline" {...props} />
);

export const EmailIcon = (props: ContactIconProps) => (
  <Icon icon="mdi:email-outline" {...props} />
);

export const GitHubIcon = (props: ContactIconProps) => (
  <Icon icon="mdi:github-circle" {...props} />
);

export const GitLabIcon = (props: ContactIconProps) => (
  <Icon icon="mdi:gitlab" {...props} />
);

export const LinkedInIcon = (props: ContactIconProps) => (
  <Icon icon="mdi:linkedin" {...props} />
);

export const CodingIcon = (props: ContactIconProps) => (
  <Icon icon="tabler:code" {...props} />
);
