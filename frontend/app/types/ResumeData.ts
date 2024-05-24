// types/resume.ts
export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  github?: string;
  linkedin?: string;
}

export interface Job {
  role: string;
  company: string;
  from: string;
  to: string;
  description: string[];
}

export interface Education {
  degree: string;
  university: string;
  from: string;
  to: string;
  grade?: string;
  coursework?: string[];
}

export interface SkillSection {
  name: string;
  skills: string[];
}

export interface Project {
  name: string;
  link?: string;
  description: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string[];
  work: Job[];
  education: Education[];
  skill_section: SkillSection[];
  projects: Project[];
  achievements: string[];
}
