import { Language } from '../types';

export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export const formatCurrency = (
  amount: number,
  lang: Language = 'bn',
  showSymbol: boolean = true
): string => {
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-IN');
  const symbol = showSymbol ? '৳ ' : '';

  if (lang === 'bn') {
    return `${symbol}${toBengaliDigits(formatted)}`;
  }
  return `${symbol}${formatted}`;
};

export interface AmortizationScheduleMonth {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface LoanCalculationResult {
  monthlyEmi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationScheduleMonth[];
}

export const calculateLoanAmortization = (
  principal: number,
  annualInterestRate: number, // in % e.g. 7
  years: number // e.g. 5
): LoanCalculationResult => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = years * 12;

  if (monthlyRate === 0) {
    const monthlyEmi = principal / totalMonths;
    return {
      monthlyEmi,
      totalPayment: principal,
      totalInterest: 0,
      schedule: []
    };
  }

  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - principal;

  const schedule: AmortizationScheduleMonth[] = [];
  let currentBalance = principal;

  for (let m = 1; m <= totalMonths; m++) {
    const interestPayment = currentBalance * monthlyRate;
    const principalPayment = Math.min(monthlyEmi - interestPayment, currentBalance);
    currentBalance = Math.max(0, currentBalance - principalPayment);

    schedule.push({
      month: m,
      payment: monthlyEmi,
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      remainingBalance: Math.round(currentBalance)
    });
  }

  return {
    monthlyEmi,
    totalPayment,
    totalInterest,
    schedule
  };
};
