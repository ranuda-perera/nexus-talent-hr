export interface ClientCompany {
  name: string;
  logo?: string;
  description: string;
  industry: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  salary: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured: boolean;
  clientCompany?: ClientCompany;
  genderPreference?: 'Male' | 'Female' | 'Any';
}