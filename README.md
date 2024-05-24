# I Want This Job So Bad

A resume AI tool to optimize your resume based on the job description.

## Overview

"IWantThisJobSoBad" is a powerful AI-driven tool designed to help you optimize your resume to align with specific job descriptions. By leveraging advanced language models, this tool can parse and analyze both resumes and job descriptions to provide tailored improvements, ensuring that your resume stands out to potential employers.

#### Please wait a few minutes for the magic to happen as the analysis takes some time !!!

Visit our website: [iwantthisjobsobad.org](https://iwantthisjobsobad.org/)


## Architecture

### High-Level Architecture
![High-Level Architecture](https://github.com/cherylchao6/IWantThisJobSoBad/assets/77141019/9bfac1c9-65a2-41fa-88f0-efc15d437bb3)


This diagram provides an overview of the deployment pipeline, illustrating how code changes from GitHub are built and deployed using Google Cloud Platform and Cloudflare for DNS management.

### Nest.js Module Interaction Diagram
![nest structure](https://github.com/cherylchao6/IWantThisJobSoBad/assets/77141019/a1d43985-6d04-4a4c-89c2-212c9c8d93c8)


This diagram showcases how different modules (Resume, Prompt, OpenAI) interact within the system, detailing the flow from HTTP requests to service interactions and data processing.

### LLM Pipeline for Resume Optimization
<img width="1679" alt="pipeline" src="https://github.com/cherylchao6/IWantThisJobSoBad/assets/77141019/50b3174a-c5fd-47d5-ba42-1a9baf6c1d1b">


This diagram illustrates the LLM pipeline specifically used for optimizing resumes based on job descriptions. It includes the process of parsing resumes and job descriptions, utilizing OpenAI for analysis and optimization, and generating the final optimized resume.

## Features

- **Resume Parser**: Extracts and formats the essential information from your resume.

  Formatted Resume JSON example
  ```json
  {
  "name": "Cheryl, Tzu Han, Chao",
  "summary": "An outgoing and positive girl who holds persistent attitudes when facing difficulties. An engineer and a scientist who learns efficiently and enthusiastically. A varsity basketball player dedicated to achieving goals and upholds a strong commitment to teamwork.",
  "phone": "+14376631394",
  "email": "nmpyt21@gmail.com",
  "media": {
    "github": "https://github.com/cherylchao6",
    "linkedin": "",
    "devpost": "",
    "medium": "",
    "leetcode": "",
    "dagshub": "",
    "kaggle": "",
    "instagram": ""
  },
  "education": [
    {
      "degree": "Computer Programming & Analysis",
      "university": "Senaca Polytechnic College (Canada)",
      "from": "Sep 2023",
      "to": "Now",
      "grade": "",
      "coursework": []
    },
    {
      "degree": "M.S. Student in Immunology",
      "university": "National Taiwan University ( NTU )",
      "from": "Sep 2017",
      "to": "Jun 2019",
      "grade": "GPA:3.93/4.3",
      "coursework": []
    }
  ],
  "skill_section": [
    {
      "name": "Database",
      "skills": ["MySQL", "Redis", "MongoDB"]
    },
    {
      "name": "Programming Language",
      "skills": ["HTML, CSS", "JavaScript, C, C++"]
    },
    {
      "name": "Cloud Service",
      "skills": ["AWS: EC2, S3, RDS, CloudFront, Auto Scaling, Load Balancer", "GCP: IAM, Cloud Run, Cloud Build, Artifact Registry, Cloud SQL"]
    },
    {
      "name": "Back-End Tools",
      "skills": ["Linux", "Node.js", "Express", "Docker", "Nest.js"]
    },
    {
      "name": "Front-End Tools",
      "skills": ["React.js", "Next.js", "Tailwind", "Bootstrape"]
    }
  ],
  "work_experience": [
    {
      "role": "Sales Specialist",
      "company": "GENOMICS bio-company",
      "from": "Nov 2019",
      "to": "Feb 2021",
      "description": ["Boosted sales performance by 10% with respect to the same period of last year."]
    },
    {
      "role": "Back-End Engineer",
      "company": "Hahow online learning platform",
      "from": "Sep 2021",
      "to": "Aug 2023",
      "description": [
        "Responsible for launching the company's electronic wallet product, MoneyPoint, and developing and implementing a refund system in both web and app.",
        "Responsible for launching new product KnowledgeCollection, refactored existing code, and handled refund and payment system.",
        "Independently resolved the longstanding issue of the new Apple private email policy, ensuring smooth and uninterrupted email delivery to our customers."
      ]
    },
    {
      "role": "Full-stack Engineer",
      "company": "Redfire",
      "from": "May 2023",
      "to": "Now",
      "description": ["Design a E-commerce website for Lamp Noodle Soup Store"]
    }
  ],
  "projects": [
    {
      "name": "MyProgress",
      "type": "A social media platform that aims to help individuals to record their progress.",
      "link": "https://github.com/cherylchao6/progress",
      "from": "",
      "to": "",
      "description": [
        "Finished project within 5 weeks independently",
        "Deployed cloud server by AWS EC2",
        "Designed schema with MySQL on AWS RDS for highly convenient remote accessibility",
        "Mitigated server loading by uploading photos to AWS S3",
        "Realized reverse proxy by NGINX",
        "Executed Unit Tests with Mocha and Chai",
        "Enhanced Back-End Web Security by authenticating HTTP requests with validator.",
        "Constructed project based on MVC framework",
        "Built chat rooms both for private and group with socket.io",
        "Designed User Interface with Bootstrap grid system",
        "Implemented carousel with Bootstrap and Owl Carousel",
        "Presented analyzed data in line chart according to different time scale by Chart.js and dynamic drop-down menu.",
        "Increased social interaction with group progress feature which creates a game atmosphere for group members to reach mutual goals with friends."
      ]
    }
  ],
  "certifications": [],
  "achievements": [
    "1st Place - The 34rd Joint Annual Conference of Biomedical Science Research Contest, Taiwan",
    "150k Overseas Scholar Fellowship in the year of 2019 from Ministry of Education, Taiwan",
    "2024 Seneca Housing Hackathon",
    "Fall 2023 President’s Honor List",
    "Women’s Basketball Varsity",
    "2024 Varsity Athletic Scholarship",
    "2024 MBNA scholarship (1 of 4 recipients)"
  ]
  }
  ```
- **Job Description Parser**: Analyzes the job description to identify key requirements and preferences.

  Formatted Job Description JSON example
  ```json
  {
    "title": "Software Developer Co-op positions (Sept 2024 - May 2025)",
    "keywords": ["Software Development", "Database", "Coding", "Java", "JavaScript", "Typescript", "Scala", "Functional Tests", "Selenium", "ScalaTest", "Data Structures", "Algorithms", "Web Technologies", "REST", "HTML/CSS", "JSON", "Angular", "Relational Databases", "Non-relational Databases", "SQL", "Angular"],
    "purpose": "To write production level code that directly impacts customers, implement new features, and fix complex bugs while collaborating with team members at all stages of the software development cycle.",
    "duties_responsibilities": ["Writing production level code that directly impacts customers", "Implementing cool new features", "Fixing complex bugs", "Collaborating with people in all stages of the software development cycle"],
    "required_qualifications": ["Coding skills in relevant programming languages (Java, JavaScript, Typescript, Scala)", "Skills in writing functional tests (using Selenium and ScalaTest)", "Knowledge of data structures and algorithms", "Attention to detail, ability to spot mistakes and identify potential improvements"],
    "preferred_qualifications": ["Knowledge of web technologies (REST, HTML/CSS, JSON, Angular)", "Knowledge of relational and non-relational databases and SQL language"],
    "company_name": "Visier Inc.",
    "company_info": ["Leader in people analytics", "Believes in a 'people-first' approach to business strategy", "Innovative technology that transforms the way organisations make decisions", "Aims to elevate employees and drive better business outcomes", "Embarking on an exciting new chapter in growth", "Offers mentorship, training, and work experience to start career", "Uses state-of-the-art technology to build innovative full-stack software solution"]
  }

  ```
  
- **Resume Optimizer**: Uses advanced language models to align your resume with the job description, highlighting relevant skills and experiences.

  Formatted Optimized Resume JSON example
  ```json
  {
  "personal": {
    "name": "Cheryl, Tzu Han, Chao",
    "phone": "+14376631394",
    "email": "nmpyt21@gmail.com",
    "github": "https://github.com/cherylchao6",
    "linkedin": ""
  },
  "summary": [
    "A dedicated software engineer with a strong foundation in Java, JavaScript, and TypeScript.",
    "Proven ability to write production-level code, implement new features, and fix complex bugs.",
    "Outstanding team player with a 'people-first' approach, aligning with Visier Inc.'s company culture."
  ],
  "education": [
    {
      "degree": "Computer Programming & Analysis",
      "university": "Senaca Polytechnic College (Canada)",
      "from": "Sep 2023",
      "to": "Now",
      "grade": "",
      "coursework": ["Java", "JavaScript", "TypeScript", "Scala", "HTML/CSS", "SQL", "Angular"]
    },
    {
      "degree": "M.S. Student in Immunology",
      "university": "National Taiwan University ( NTU )",
      "from": "Sep 2017",
      "to": "Jun 2019",
      "grade": "GPA:3.93/4.3",
      "coursework": []
    }
  ],
  "skill_section": [
    {
      "name": "Programming Language",
      "skills": ["Java", "JavaScript", "TypeScript", "Scala", "HTML/CSS", "Angular"]
    },
    {
      "name": "Database",
      "skills": ["SQL", "MySQL", "Redis", "MongoDB"]
    },
    {
      "name": "Web Technologies",
      "skills": ["REST", "JSON"]
    },
    {
      "name": "Testing",
      "skills": ["Selenium", "ScalaTest"]
    }
  ],
  "work": [
    {
      "role": "Back-End Engineer",
      "company": "Hahow online learning platform",
      "location": "",
      "from": "Sep 2021",
      "to": "Aug 2023",
      "description": [
        "Developed and implemented a refund system in web and app, enhancing customer satisfaction.",
        "Launched new product KnowledgeCollection by refactoring existing code, improving the payment and refund system.",
        "Resolved the issue of the new Apple private email policy, ensuring smooth and uninterrupted email delivery to customers."
      ]
    },
    {
      "role": "Full-stack Engineer",
      "company": "Redfire",
      "location": "",
      "from": "May 2023",
      "to": "Now",
      "description": [
        "Designed an E-commerce website for Lamp Noodle Soup Store, improving online visibility and sales.",
        "Managed both front-end and back-end development, ensuring seamless user experience.",
        "Collaborated with cross-functional teams, ensuring timely project completion."
      ]
    },
    {
      "role": "Sales Specialist",
      "company": "GENOMICS bio-company",
      "location": "",
      "from": "Nov 2019",
      "to": "Feb 2021",
      "description": [
        "Boosted sales performance by 10% with respect to the same period of last year, contributing to the company's revenue growth."
      ]
    }
  ],
  "projects": [
    {
      "name": "MyProgress",
      "link": "https://github.com/cherylchao6/progress",
      "from": "",
      "to": "",
      "description": [
        "Completed the project within 5 weeks independently, demonstrating strong project management skills.",
        "Designed schema with MySQL on AWS RDS for highly convenient remote accessibility, improving data management efficiency.",
        "Enhanced Back-End Web Security by authenticating HTTP requests with validator, ensuring data security."
      ]
    }
  ],
  "certifications": [],
  "achievements": [
    "1st Place - The 34rd Joint Annual Conference of Biomedical Science Research Contest, Taiwan",
    "150k Overseas Scholar Fellowship in the year of 2019 from Ministry of Education, Taiwan",
    "2024 Seneca Housing Hackathon"
  ]
  }
  ```


## Usage

1. Upload your resume and the job description you are targeting.
2. The tool will parse both documents and provide an optimized version of your resume tailored to the job description.
3. Sit and wait for minutes for the magic to happen ! 
4. Download the optimized resume and use it in your job application.


## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:nmpyt21@gmail.com).
