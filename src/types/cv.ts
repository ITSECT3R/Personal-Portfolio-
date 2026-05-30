import type { ReactElement } from 'react';

export interface Job {
  id?: string;
  company: string;
  position: string;
  displayDate: string;
  location?: string;
  responsibilities: string[];
}

export interface Certificate {
  name: string;
  link: string;
}

export interface CertificationIssuer {
  issuer: string;
  svg?: ReactElement | null;
  certificates: Certificate[];
}

export interface SkillSet {
  category: string;
  skills: string[];
}

export interface ContactItem {
  svg: ReactElement | null;
  name: string;
  link: string;
}
