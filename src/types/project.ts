export type ProjectKind = 'demo' | 'project';
export type ProjectCategory =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'testing'
  | 'networking';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  kind: ProjectKind;
  category: ProjectCategory;
  languages: string[];
  technologies: string[];
  imageUrl: string[];
  githubUrl?: string;
  liveUrl?: string;
}
