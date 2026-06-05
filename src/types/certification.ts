export type CertificationIssuer = 'epam' | 'freecodecamp' | 'aws';

export type CertificationDomain =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'testing'
  | 'devops'
  | 'cloud';

export interface Certification {
  id: string;
  title: string;
  issuer: CertificationIssuer;
  issuedYear: number;
  domain: CertificationDomain;
  /** Must match TECH_ICON_MAP keys where possible */
  technologies: string[];
  description: string;
  link: string;
}
