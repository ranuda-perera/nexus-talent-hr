import { Job } from '../types/Job';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Technology',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    experience: '5-7 years',
    salary: 'AED 15,000 - 25,000',
    postedDate: '2025-01-10',
    description: 'Join our client\'s dynamic technology team in Abu Dhabi and help build cutting-edge solutions that drive digital transformation across the region.',
    responsibilities: [
      'Design and develop scalable web applications using modern technologies',
      'Collaborate with cross-functional teams to deliver high-quality solutions',
      'Mentor junior developers and contribute to technical architecture decisions',
      'Participate in code reviews and maintain coding standards',
      'Optimize application performance and ensure security best practices'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in full-stack development',
      'Proficiency in React, Node.js, and modern JavaScript/TypeScript',
      'Experience with cloud platforms (AWS, Azure, or Google Cloud)',
      'Strong problem-solving skills and attention to detail',
      'Excellent communication skills in English and Arabic (preferred)'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Comprehensive health insurance',
      'Annual flight tickets home',
      'Professional development opportunities',
      'Flexible working arrangements'
    ],
    featured: true,
    clientCompany: {
      name: 'Emirates Tech Solutions',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'A leading technology company in the UAE specializing in digital transformation and enterprise solutions for government and private sector clients.',
      industry: 'Technology & Software',
      location: 'Abu Dhabi'
    },
    genderPreference: 'Any'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '3-5 years',
    salary: 'AED 12,000 - 18,000',
    postedDate: '2025-01-08',
    description: 'Lead marketing initiatives for our prestigious client in the luxury retail sector and drive brand growth in the competitive UAE market.',
    responsibilities: [
      'Develop and execute comprehensive marketing strategies',
      'Manage digital marketing campaigns across multiple channels',
      'Analyze market trends and competitor activities',
      'Coordinate with external agencies and vendors',
      'Track and report on marketing performance metrics'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Business, or related field',
      '3+ years of marketing experience in the UAE market',
      'Proven track record in digital marketing and social media',
      'Strong analytical skills and data-driven mindset',
      'Excellent written and verbal communication skills',
      'Knowledge of Arabic language is a plus'
    ],
    benefits: [
      'Competitive salary package',
      'Health and dental insurance',
      'Annual leave and public holidays',
      'Training and development programs',
      'Company car allowance'
    ],
    featured: true,
    clientCompany: {
      name: 'Luxury Retail Group',
      logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Premium retail company operating luxury brands across the Middle East, known for exceptional customer service and innovative retail experiences.',
      industry: 'Retail & Luxury Goods',
      location: 'Dubai'
    },
    genderPreference: 'Female'
  },
  {
    id: '3',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    experience: '2-4 years',
    salary: 'AED 8,000 - 15,000',
    postedDate: '2025-01-12',
    description: 'Join our client\'s finance team at a leading investment firm and contribute to strategic financial planning and analysis in the region.',
    responsibilities: [
      'Prepare financial reports and analysis for management',
      'Support budgeting and forecasting processes',
      'Conduct variance analysis and provide insights',
      'Assist with month-end and year-end closing procedures',
      'Collaborate with different departments on financial projects'
    ],
    requirements: [
      'Bachelor\'s degree in Finance, Accounting, or Economics',
      '2+ years of experience in financial analysis',
      'Strong proficiency in Excel and financial modeling',
      'Knowledge of ERP systems (SAP preferred)',
      'Attention to detail and strong analytical skills',
      'CPA or CFA certification is a plus'
    ],
    benefits: [
      'Attractive salary and benefits package',
      'Health insurance coverage',
      'Professional development opportunities',
      'Annual performance bonuses',
      'Visa and accommodation support'
    ],
    featured: false,
    clientCompany: {
      name: 'Gulf Investment Partners',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'A premier investment and asset management firm serving institutional and high-net-worth clients across the GCC region.',
      industry: 'Financial Services',
      location: 'Abu Dhabi'
    },
    genderPreference: 'Any'
  },
  {
    id: '4',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Sharjah, UAE',
    type: 'Full-time',
    experience: '4-6 years',
    salary: 'AED 14,000 - 20,000',
    postedDate: '2025-01-05',
    description: 'Drive HR strategy and support business growth for our manufacturing client while ensuring employee engagement and organizational development.',
    responsibilities: [
      'Partner with business leaders on HR strategy and initiatives',
      'Manage talent acquisition and retention programs',
      'Oversee employee relations and performance management',
      'Develop and implement HR policies and procedures',
      'Support organizational change and development initiatives'
    ],
    requirements: [
      'Bachelor\'s degree in Human Resources or Business Administration',
      '4+ years of HR Business Partner experience',
      'Strong knowledge of UAE labor law and regulations',
      'Experience in talent management and organizational development',
      'Excellent interpersonal and communication skills',
      'SHRM or CIPD certification preferred'
    ],
    benefits: [
      'Competitive compensation package',
      'Comprehensive benefits including health insurance',
      'Professional certification support',
      'Annual training allowance',
      'Flexible working hours'
    ],
    featured: false,
    clientCompany: {
      name: 'Advanced Manufacturing Co.',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading manufacturing company specializing in industrial equipment and components, serving clients across the Middle East and Africa.',
      industry: 'Manufacturing & Industrial',
      location: 'Sharjah'
    },
    genderPreference: 'Any'
  },
  {
    id: '5',
    title: 'Project Manager',
    department: 'Operations',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '5-8 years',
    salary: 'AED 16,000 - 24,000',
    postedDate: '2025-01-15',
    description: 'Lead complex construction projects for our esteemed client and drive operational excellence in Dubai\'s dynamic construction sector.',
    responsibilities: [
      'Manage end-to-end project lifecycle from initiation to closure',
      'Coordinate cross-functional teams and stakeholders',
      'Develop project plans, timelines, and resource allocation',
      'Monitor project progress and manage risks and issues',
      'Ensure projects are delivered on time, within budget, and scope'
    ],
    requirements: [
      'Bachelor\'s degree in Engineering, Construction Management, or related field',
      '5+ years of project management experience in construction',
      'PMP or Prince2 certification required',
      'Experience with project management tools (MS Project, Primavera)',
      'Strong leadership and team management skills',
      'Excellent problem-solving and decision-making abilities'
    ],
    benefits: [
      'Excellent salary and bonus structure',
      'Health insurance for family',
      'Annual leave and sick leave',
      'Professional development support',
      'Housing allowance'
    ],
    featured: true,
    clientCompany: {
      name: 'Dubai Construction Group',
      logo: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Premier construction and development company responsible for iconic projects across Dubai, known for quality and innovation in construction.',
      industry: 'Construction & Real Estate',
      location: 'Dubai'
    },
    genderPreference: 'Male'
  },
  {
    id: '6',
    title: 'Sales Executive',
    department: 'Sales',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    experience: '1-3 years',
    salary: 'AED 6,000 - 12,000',
    postedDate: '2025-01-18',
    description: 'Drive sales growth for our automotive client and build strong relationships with customers in the competitive Abu Dhabi market.',
    responsibilities: [
      'Identify and develop new business opportunities',
      'Build and maintain relationships with key clients',
      'Prepare and deliver sales presentations and proposals',
      'Achieve monthly and quarterly sales targets',
      'Provide excellent customer service and support'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Marketing, or related field',
      '1-3 years of sales experience in the UAE market',
      'Strong communication and negotiation skills',
      'Self-motivated with a results-driven approach',
      'Valid UAE driving license',
      'Bilingual (English/Arabic) preferred'
    ],
    benefits: [
      'Base salary plus commission structure',
      'Health insurance coverage',
      'Company car and fuel allowance',
      'Mobile phone and laptop provided',
      'Performance-based bonuses'
    ],
    featured: false,
    clientCompany: {
      name: 'Premier Auto Group',
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading automotive dealership group representing premium car brands across the UAE, committed to exceptional customer service.',
      industry: 'Automotive & Transportation',
      location: 'Abu Dhabi'
    },
    genderPreference: 'Any'
  },
  {
    id: '7',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '2-4 years',
    salary: 'AED 8,000 - 14,000',
    postedDate: '2025-01-20',
    description: 'Join our client\'s marketing team at a leading hospitality group and create engaging digital experiences for guests across the region.',
    responsibilities: [
      'Develop and execute digital marketing campaigns',
      'Manage social media platforms and content creation',
      'Analyze digital marketing performance and ROI',
      'Coordinate with creative agencies and vendors',
      'Optimize website content and SEO strategies'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      '2+ years of digital marketing experience',
      'Proficiency in Google Analytics, AdWords, and social media platforms',
      'Experience with content management systems',
      'Creative mindset with strong analytical skills',
      'Knowledge of hospitality industry preferred'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Health insurance and wellness programs',
      'Hotel discounts worldwide',
      'Professional development opportunities',
      'Annual performance bonuses'
    ],
    featured: false,
    clientCompany: {
      name: 'Luxury Hospitality Group',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Prestigious hospitality group operating luxury hotels and resorts across the Middle East, renowned for exceptional guest experiences.',
      industry: 'Hospitality & Tourism',
      location: 'Dubai'
    },
    genderPreference: 'Female'
  },
  {
    id: '8',
    title: 'Operations Manager',
    department: 'Operations',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    experience: '6-10 years',
    salary: 'AED 18,000 - 28,000',
    postedDate: '2025-01-22',
    description: 'Lead operations for our logistics client and optimize supply chain processes across the UAE and GCC region.',
    responsibilities: [
      'Oversee daily operations and logistics processes',
      'Develop and implement operational strategies',
      'Manage team performance and productivity',
      'Ensure compliance with safety and quality standards',
      'Optimize costs and improve operational efficiency'
    ],
    requirements: [
      'Bachelor\'s degree in Operations Management, Supply Chain, or related field',
      '6+ years of operations management experience',
      'Strong knowledge of logistics and supply chain processes',
      'Experience with ERP systems and operational software',
      'Excellent leadership and team management skills',
      'Six Sigma or Lean certification preferred'
    ],
    benefits: [
      'Excellent compensation package',
      'Comprehensive health and life insurance',
      'Annual leave and public holidays',
      'Professional development programs',
      'Company vehicle and fuel allowance'
    ],
    featured: true,
    clientCompany: {
      name: 'Gulf Logistics Solutions',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading logistics and supply chain company serving the GCC region with comprehensive warehousing and distribution solutions.',
      industry: 'Logistics & Supply Chain',
      location: 'Abu Dhabi'
    },
    genderPreference: 'Male'
  }
];