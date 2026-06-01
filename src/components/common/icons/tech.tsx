import type { ReactElement } from 'react';
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

export const D3Icon = (props: TechIconProps) => (
  <Icon icon="logos:d3" {...props} />
);

export const ReduxIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:redux" {...props} />
);

export const SassIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:sass" {...props} />
);

export const ViteIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:vite-dark" {...props} />
);

export const ESLintIcon = (props: TechIconProps) => (
  <Icon icon="devicon:eslint" {...props} />
);

// ─── Map: technology name → icon component ─────────────────────────────────
// Technologies not present here render as a text fallback badge in ProjectCard.
type TechIconComponent = (props: TechIconProps) => ReactElement;

export const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  Python: PythonIcon,
  HTML: HtmlIcon,
  CSS: CssIcon,
  Git: GitIcon,
  Docker: DockerIcon,
  MongoDB: MongoDBIcon,
  Redux: ReduxIcon,
  Sass: SassIcon,
  Vite: ViteIcon,
  ESLint: ESLintIcon,
  'CSS Modules': CssIcon,
  'Node.js': NodeIcon,
  'D3.js': D3Icon,
};