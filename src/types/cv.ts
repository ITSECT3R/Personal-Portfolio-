export interface Job {
  id?: string;
  company: string;
  position: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  responsibilities: string[];
}

export interface Certificate {
  name: string;
  link: string;
}

export interface CertificationIssuer {
  issuer: string;
  svg?: any;
  certificates: Certificate[];
}
