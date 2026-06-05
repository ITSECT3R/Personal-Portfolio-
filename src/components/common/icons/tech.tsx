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

export const PostgreSQLIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:postgresql-dark" {...props} />
);

export const DynamoDBIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:dynamodb-dark" {...props} />
);

export const ExpressIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:expressjs-dark" {...props} />
);

export const NextJsIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:nextjs-dark" {...props} />
);

export const PlaywrightIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:playwright" {...props} />
);

export const JestIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:jest" {...props} />
);

export const TailwindIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:tailwindcss-dark" {...props} />
);

export const BootstrapIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:bootstrap" {...props} />
);

export const JenkinsIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:jenkins-dark" {...props} />
);

export const GithubActionsIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:githubactions-dark" {...props} />
);

export const KubernetesIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:kubernetes" {...props} />
);

export const PostmanIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:postman" {...props} />
);

export const AWSIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:aws-dark" {...props} />
);

export const AzureIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:azure-dark" {...props} />
);

export const CloudflareIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:cloudflare-dark" {...props} />
);

export const VercelIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:vercel-dark" {...props} />
);

export const GithubIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:github-dark" {...props} />
);

export const ReactNativeIcon = (props: TechIconProps) => (
  <Icon icon="skill-icons:react-dark" {...props} />
);

export const WebDriverIOIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:webdriverio" {...props} />
);

export const MochaIcon = (props: TechIconProps) => (
  <Icon icon="logos:mocha" {...props} />
);

export const ChaiIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:chai" {...props} />
);

export const CucumberIcon = (props: TechIconProps) => (
  <Icon icon="logos:cucumber" {...props} />
);

export const JQueryIcon = (props: TechIconProps) => (
  <Icon icon="devicon:jquery" {...props} />
);

export const PrettierIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:prettier" {...props} />
);

export const N8NIcon = (props: TechIconProps) => (
  <Icon icon="logos:n8n-icon" {...props} />
);

export const AxiosIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:axios" {...props} />
);

export const VSCodeIcon = (props: TechIconProps) => (
  <Icon icon="devicon:vscode" {...props} />
);

export const GitHubCopilotIcon = (props: TechIconProps) => (
  <Icon icon="simple-icons:githubcopilot" {...props} />
);

// ─── Map: technology name → icon component ─────────────────────────────────
// Technologies not present here render as a text fallback badge in ProjectCard.
type TechIconComponent = (props: TechIconProps) => ReactElement;

export const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  // Languages
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  Python: PythonIcon,
  HTML: HtmlIcon,
  CSS: CssIcon,
  // Infrastructure / tools
  Git: GitIcon,
  Docker: DockerIcon,
  Kubernetes: KubernetesIcon,
  // Databases
  MongoDB: MongoDBIcon,
  PostgreSQL: PostgreSQLIcon,
  DynamoDB: DynamoDBIcon,
  // Front-end ecosystem
  Redux: ReduxIcon,
  Sass: SassIcon,
  Vite: ViteIcon,
  'Tailwind CSS': TailwindIcon,
  Bootstrap: BootstrapIcon,
  jQuery: JQueryIcon,
  'React Native': ReactNativeIcon,
  // Back-end ecosystem
  'Node.js': NodeIcon,
  'Express.js': ExpressIcon,
  'Next.js': NextJsIcon,
  Axios: AxiosIcon,
  // Testing
  Jest: JestIcon,
  Playwright: PlaywrightIcon,
  WebDriverIO: WebDriverIOIcon,
  Mocha: MochaIcon,
  Chai: ChaiIcon,
  Cucumber: CucumberIcon,
  // CI/CD
  Jenkins: JenkinsIcon,
  'GitHub Actions': GithubActionsIcon,
  Postman: PostmanIcon,
  N8N: N8NIcon,
  // Cloud
  AWS: AWSIcon,
  Azure: AzureIcon,
  CloudFlare: CloudflareIcon,
  Vercel: VercelIcon,
  // Misc
  ESLint: ESLintIcon,
  Prettier: PrettierIcon,
  GitHub: GithubIcon,
  'GitHub Copilot': GitHubCopilotIcon,
  'Visual Studio Code': VSCodeIcon,
  'D3.js': D3Icon,
  // Legacy / kept for backwards compat
  'CSS Modules': CssIcon,
};