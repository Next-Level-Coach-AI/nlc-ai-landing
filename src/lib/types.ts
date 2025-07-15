export interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
}

export interface Question {
    id: number;
    text: string;
    subtitle?: string;
    options: QuestionOption[];
    multiSelect?: boolean;
}

export interface QuestionOption {
    text: string;
    value: string;
    disqualifies?: boolean;
    qualifies?: boolean;
    points?: number;
}

export type Answers = Record<number, string | string[]>;
