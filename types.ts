
export interface ExpenseEntry {
  id: string;
  index: number;
  requestNumber: string;
  requestType: string;
  subject: string;
  executionDate: string;
  cost: number | '';
  notes: string;
}

export interface PeriodData {
  entries: ExpenseEntry[];
  generalNotes: string;
}

export const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];
