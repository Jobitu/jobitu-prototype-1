import { Interview, PreparationResource } from "./types";

export const mockUpcomingInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 123-4567',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    date: '2025-08-25',
    time: '14:00',
    duration: 90,
    type: 'online',
    status: 'scheduled',
    meetingLink: 'https://meet.google.com/xyz-abc-def',
    interviewers: [
      { name: 'Alex Johnson', role: 'Engineering Manager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', email: 'alex@company.com' },
      { name: 'Sarah Wilson', role: 'Senior Developer', email: 'sarah@company.com' }
    ],
    agenda: 'Technical discussion (45 min) + Live coding (45 min)',
    suggestedQuestions: [
      'Tell us about your experience with React and TypeScript',
      'How do you handle state management in large applications?',
      'Walk us through your approach to code review'
    ]
  },
  {
    id: '2',
    candidateName: 'Michael Rodriguez',
    candidateEmail: 'michael.rodriguez@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 234-5678',
    jobTitle: 'Product Manager',
    jobId: 'job-2',
    date: '2025-08-26',
    time: '10:00',
    duration: 60,
    type: 'online',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/123456789',
    interviewers: [
      { name: 'Emily Davis', role: 'Head of Product', email: 'emily@company.com' }
    ]
  },
  {
    id: '3',
    candidateName: 'Jessica Park',
    candidateEmail: 'jessica.park@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 345-6789',
    jobTitle: 'UX Designer',
    jobId: 'job-3',
    date: '2025-08-27',
    time: '15:30',
    duration: 75,
    type: 'in-person',
    status: 'scheduled',
    location: 'Conference Room A, 2nd Floor',
    interviewers: [
      { name: 'David Kim', role: 'Design Lead', email: 'david@company.com' },
      { name: 'Maria Garcia', role: 'Senior Designer', email: 'maria@company.com' }
    ]
  }
];

export const mockPastInterviews: Interview[] = [
  {
    id: '4',
    candidateName: 'Emily Johnson',
    candidateEmail: 'emily.johnson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    jobTitle: 'UX Designer',
    jobId: 'job-3',
    date: '2025-08-20',
    time: '15:00',
    duration: 75,
    type: 'online',
    status: 'completed',
    interviewers: [
      { name: 'David Kim', role: 'Design Lead', email: 'david@company.com' }
    ],
    outcome: 'hired',
    feedback: {
      rating: 4,
      notes: 'Strong portfolio and design thinking. Great cultural fit. Demonstrated excellent problem-solving skills during the design challenge.',
      recommendation: 'hire'
    }
  },
  {
    id: '5',
    candidateName: 'David Lee',
    candidateEmail: 'david.lee@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    jobTitle: 'Backend Engineer',
    jobId: 'job-4',
    date: '2025-08-18',
    time: '11:00',
    duration: 60,
    type: 'phone',
    status: 'completed',
    interviewers: [
      { name: 'Mike Chen', role: 'Senior Engineer', email: 'mike@company.com' }
    ],
    outcome: 'rejected',
    feedback: {
      rating: 2,
      notes: 'Technical skills not quite at senior level. Struggled with system design questions and database optimization concepts.',
      recommendation: 'reject'
    }
  },
  {
    id: '6',
    candidateName: 'Anna Thompson',
    candidateEmail: 'anna.thompson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    jobId: 'job-2',
    date: '2025-08-15',
    time: '13:30',
    duration: 90,
    type: 'online',
    status: 'completed',
    interviewers: [
      { name: 'Emily Davis', role: 'Head of Product', email: 'emily@company.com' },
      { name: 'Tom Wilson', role: 'Senior PM', email: 'tom@company.com' }
    ],
    outcome: 'hired',
    feedback: {
      rating: 5,
      notes: 'Exceptional candidate with strong strategic thinking and execution experience. Demonstrated deep understanding of product metrics and user research.',
      recommendation: 'hire'
    }
  }
];

export const mockPreparationResources: PreparationResource[] = [
  {
    id: '1',
    name: 'Technical Interview Template',
    type: 'template',
    description: 'Standardized template for technical interviews with coding exercises and system design questions',
    content: `Technical Interview Structure:
    
1. Introduction & Icebreaker (5 min)
   - Welcome candidate
   - Brief team/company overview
   - Interview structure explanation

2. Technical Background Discussion (15 min)
   - Review resume and recent projects
   - Deep dive into specific technologies
   - Architecture and design decisions

3. Coding Exercise (30 min)
   - Problem solving approach
   - Code quality and best practices
   - Testing and edge cases

4. System Design (20 min)
   - Scalability considerations
   - Database design
   - Performance optimization

5. Questions & Next Steps (10 min)
   - Candidate questions
   - Timeline and process overview

Evaluation Criteria:
- Technical competency (40%)
- Problem-solving approach (30%)
- Communication skills (20%)
- Cultural fit (10%)`,
    category: 'Engineering'
  },
  {
    id: '2',
    name: 'Behavioral Interview Checklist', 
    type: 'checklist',
    description: 'Key behavioral questions and evaluation criteria using the STAR method',
    content: `Pre-Interview Preparation:
□ Review candidate's resume and application
□ Prepare role-specific behavioral questions
□ Set up interview environment
□ Have evaluation form ready

STAR Method Questions:
□ "Tell me about a time you had to work with a difficult team member"
□ "Describe a situation where you had to meet a tight deadline"
□ "Give an example of when you had to learn something new quickly"
□ "Tell me about a time you made a mistake and how you handled it"
□ "Describe a situation where you had to influence someone without authority"

Evaluation Areas:
□ Leadership potential
□ Problem-solving abilities
□ Communication skills
□ Teamwork and collaboration
□ Adaptability and learning
□ Cultural alignment

Post-Interview:
□ Complete evaluation form immediately
□ Document specific examples and responses
□ Provide recommendation with rationale
□ Share feedback with hiring team`,
    category: 'General'
  },
  {
    id: '3',
    name: 'Interview Best Practices Guide',
    type: 'guideline',
    description: 'Comprehensive guidelines for conducting effective and fair interviews',
    content: `Interview Best Practices:

Before the Interview:
- Research the candidate thoroughly
- Prepare structured questions
- Ensure proper interview environment
- Review job requirements and success criteria
- Plan for note-taking

During the Interview:
- Start with a warm welcome
- Explain the interview structure
- Ask open-ended questions
- Listen actively and take notes
- Allow time for candidate questions
- Be mindful of unconscious bias

Legal Considerations:
- Focus on job-related qualifications
- Avoid personal questions about family, age, religion
- Document all decisions with objective criteria
- Treat all candidates consistently

After the Interview:
- Complete evaluation immediately
- Provide specific, actionable feedback
- Communicate decision timeline to candidate
- Share insights with hiring team

Red Flags to Watch For:
- Inconsistent information
- Poor communication skills
- Lack of preparation or interest
- Negative attitude toward previous employers
- Inability to provide specific examples`,
    category: 'Best Practices'
  },
  {
    id: '4',
    name: 'Design Interview Framework',
    type: 'template',
    description: 'Structured approach for evaluating UX/UI designers with portfolio review and design challenges',
    content: `Design Interview Structure:

1. Portfolio Presentation (25 min)
   - Candidate presents 2-3 key projects
   - Focus on process, not just outcomes
   - Ask about constraints and trade-offs
   - Understand role and contributions

2. Design Challenge (30 min)
   - Present real or hypothetical design problem
   - Observe problem-solving approach
   - Evaluate sketching and ideation
   - Assess user-centered thinking

3. Technical Discussion (15 min)
   - Design tools and workflow
   - Collaboration with developers
   - Design system knowledge
   - Accessibility considerations

4. Culture & Collaboration (10 min)
   - Team dynamics experience
   - Feedback handling
   - Mentoring and growth mindset

Evaluation Framework:
- Design thinking & process (35%)
- Visual design skills (25%)
- User experience understanding (25%)
- Communication & collaboration (15%)`,
    category: 'Design'
  },
  {
    id: '5',
    name: 'Product Manager Assessment',
    type: 'checklist',
    description: 'Evaluation checklist for product management roles focusing on strategic thinking and execution',
    content: `Product Manager Interview Checklist:

Strategic Thinking:
□ Can articulate product vision and strategy
□ Understands market dynamics and competition
□ Shows data-driven decision making
□ Demonstrates customer empathy

Execution Excellence:
□ Experience with product development lifecycle
□ Ability to prioritize features and requirements
□ Understanding of technical constraints
□ Project management and timeline skills

Leadership & Communication:
□ Can influence without authority
□ Strong presentation and storytelling
□ Conflict resolution experience
□ Cross-functional collaboration

Product Sense:
□ Can identify product opportunities
□ Understands user needs and pain points
□ Shows good judgment on trade-offs
□ Experience with product metrics

Assessment Questions:
□ "How would you improve our product?"
□ "Tell me about a product you launched"
□ "How do you prioritize features?"
□ "Describe a difficult product decision you made"

Evaluation Scale:
□ Strong Hire - Exceeds expectations
□ Hire - Meets all requirements
□ No Hire - Below expectations
□ Strong No Hire - Significant concerns`,
    category: 'Product'
  }
];