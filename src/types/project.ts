export type ProjectKind = 'demo' | 'project';
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';

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
