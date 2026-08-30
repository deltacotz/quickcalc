// GPA logic (used by the dedicated GPA widget component).

export const GRADE_POINTS: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0,
};

export const GRADE_OPTIONS = Object.entries(GRADE_POINTS).map(([grade, points]) => ({
  value: grade,
  label: `${grade} (${points.toFixed(1).replace(/\.0$/, "")})`,
}));

export interface Course {
  grade: string;
  credits: string;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
}

export function computeGpa(courses: Course[]): GpaResult | null {
  let totalPoints = 0;
  let totalCredits = 0;
  for (const c of courses) {
    const points = GRADE_POINTS[c.grade];
    if (points === undefined) continue;
    const credits = Number.parseFloat(c.credits);
    if (!Number.isFinite(credits) || credits <= 0) continue;
    totalPoints += points * credits;
    totalCredits += credits;
  }
  if (totalCredits <= 0) return null;
  return { gpa: totalPoints / totalCredits, totalCredits, totalPoints };
}
