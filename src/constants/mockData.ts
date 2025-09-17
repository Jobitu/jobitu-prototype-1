import { OnboardingData } from "../components/OnboardingFlow";

export const mockCandidateData: OnboardingData = {
  basicInfo: {
    fullName: "Alex Johnson",
    currentRole: "Senior Frontend Developer",
    location: "San Francisco, CA",
    bio: "Passionate frontend developer with 5+ years of experience building scalable web applications. I love creating beautiful, user-friendly interfaces and working with modern JavaScript frameworks."
  },
  education: [
    {
      school: "Stanford University",
      degree: "Bachelor of Science in Computer Science",
      year: "2019"
    }
  ],
  workExperience: [
    {
      role: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      startDate: "2022",
      endDate: "Present",
      description: "Lead frontend development for a team of 5 developers, building React applications used by 100k+ users."
    },
    {
      role: "Frontend Developer",
      company: "StartupX",
      startDate: "2020",
      endDate: "2022",
      description: "Developed and maintained React components for a fast-growing e-commerce platform."
    }
  ],
  skills: {
    hardSkills: ["React", "TypeScript", "Node.js", "GraphQL", "CSS/SCSS"],
    softSkills: ["Leadership", "Communication", "Problem Solving"],
    tools: ["Git", "Figma", "Webpack", "Jest"]
  },
  careerPreferences: {
    interestedRoles: ["Senior Frontend Developer", "Full Stack Developer", "Technical Lead"],
    workArrangement: "remote",
    salaryRange: "$120k - $160k"
  },
  careerGoals: "Become a technical lead and eventually transition into a CTO role at a growing startup."
};

export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
};