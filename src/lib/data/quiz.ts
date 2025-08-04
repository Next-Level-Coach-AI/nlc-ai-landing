import {Answers, Question} from "@/lib/types/quiz";

export const questions: Question[] = [
    {
        id: 1,
        text: "What's your average monthly revenue from coaching and digital products?",
        options: [
            { text: "Less than $5K", value: "under5k", disqualifies: true },
            { text: "$5K-$20K", value: "5k-20k", qualifies: true },
            { text: "$20K-$50K", value: "20k-50k", qualifies: true },
            { text: "$50K-$100K", value: "50k-100k", qualifies: true },
            { text: "$100K+/month", value: "100k+", qualifies: true }
        ]
    },
    {
        id: 2,
        text: "Which best describes your current role?",
        options: [
            { text: "I'm the sole decision-maker in my coaching business", value: "sole_decision", qualifies: true },
            { text: "I'm a co-founder or part of a leadership team", value: "leadership", qualifies: true },
            { text: "I work under a coach/founder as support staff", value: "support_staff", disqualifies: true },
            { text: "I'm a freelancer or assistant evaluating tools", value: "freelancer", disqualifies: true }
        ]
    },
    {
        id: 3,
        text: "Which of these problems do you most relate to? (Select all that apply)",
        options: [
            { text: "I fall behind on replying to client emails and DMs", value: "email_behind", points: 1 },
            { text: "I lose track of client engagement and drop-offs", value: "lose_track", points: 1 },
            { text: "I forget to follow up with leads who ghosted", value: "no_followup", points: 1 },
            { text: "I post inconsistently because content creation burns me out", value: "content_burnout", points: 1 },
            { text: "None of these — my systems are running smoothly", value: "no_problems", disqualifies: true }
        ],
        multiSelect: true
    },
    {
        id: 4,
        text: "Which feels more true?",
        options: [
            { text: "I need more leads", value: "need_leads" },
            { text: "I need better systems to keep up with demand", value: "need_systems" },
            { text: "I need both", value: "need_both" },
            { text: "I'm not sure", value: "not_sure" }
        ]
    },
    {
        id: 5,
        text: "What's your biggest focus over the next 90 days?",
        options: [
            { text: "Scaling revenue without burning out", value: "scale_revenue", qualifies: true },
            { text: "Hiring more team members", value: "hire_team", qualifies: true },
            { text: "Fixing client fulfillment & retention", value: "fix_retention", qualifies: true },
            { text: "Getting more leads", value: "get_leads", qualifies: true },
            { text: "Just maintaining what I have", value: "maintain", points: -1 }
        ]
    },
    {
        id: 6,
        text: "If we could help you plug in AI agents that save 10+ hours/week and improve client retention without hiring, how interested would you be?",
        subtitle: "(Scale: Not Interested – Somewhat Interested – Very Interested – I want this yesterday)",
        options: [
            { text: "Not Interested", value: "not_interested", points: 0 },
            { text: "Somewhat Interested", value: "somewhat", points: 1 },
            { text: "Very Interested", value: "very", points: 2 },
            { text: "I want this yesterday", value: "want_now", points: 3 }
        ]
    }
];

export const calculateQualification = (answers: Answers): boolean => {
    if (answers[1] === 'under5k') return false;
    if (answers[2] === 'support_staff' || answers[2] === 'freelancer') return false;
    if (answers[3] && answers[3].includes('no_problems')) return false;

    let points = 0;
    if (answers[3]) {
        points += (answers[3] as string[]).filter(a => a !== 'no_problems').length;
    }
    if (answers[6]) {
        const interestPoints = {
            'not_interested': 0,
            'somewhat': 1,
            'very': 2,
            'want_now': 3
        };
        points += interestPoints[answers[6] as keyof typeof interestPoints] || 0;
    }

    return points >= 3;
};
