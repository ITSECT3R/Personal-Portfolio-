import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

type TechIconProps = Partial<IconProps>;

export const ReactIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:react-dark" {...props} />
);

export const TypeScriptIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:typescript" {...props} />
);

export const JavaScriptIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:javascript" {...props} />
);

export const NodeIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:nodejs-dark" {...props} />
);

export const PythonIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:python-dark" {...props} />
);

export const HtmlIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:html" {...props} />
);

export const CssIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:css" {...props} />
);

export const GitIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:git" {...props} />
);

export const DockerIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:docker" {...props} />
);

export const MongoDBIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:mongodb" {...props} />
);
