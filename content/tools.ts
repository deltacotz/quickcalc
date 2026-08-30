// Per-tool editorial content. This is what separates a rankable, AdSense-approvable
// page from a bare calculator widget ("thin content"). Each entry ships original
// intro, formula explanation, worked examples and an FAQ.

export type ToolCategory = "Everyday" | "Finance" | "Health" | "Education";

export interface ToolContent {
  slug: string;
  name: string;
  category: ToolCategory;
  kind: "widget" | "gpa";
  metaDescription: string;
  intro: string;
  howItWorks: { formula: string; explanation: string };
  examples: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  disclaimers?: ("medical" | "financial")[];
  affiliate?: { cta: string; url: string; note: string };
  related: string[];
}

export const TOOLS: ToolContent[] = [
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free percentage calculator: find what X% of a number is, what one number is as a percent of another, and percentage increase or decrease.",
    intro:
      "Use this free percentage calculator to solve common percentage problems in seconds. Work out what a percentage of a number is, express one number as a percentage of another, or find the percentage increase or decrease between two values — results update instantly as you type.",
    howItWorks: {
      formula: "Part = (Percentage ÷ 100) × Whole",
      explanation:
        "A percentage is a fraction of 100. To find a percentage of a number, divide the percentage by 100 and multiply by the whole. To express one number as a percentage of another, divide the part by the whole and multiply by 100.",
    },
    examples: [
      { title: "What is 15% of 50?", text: "(15 ÷ 100) × 50 = 7.5. So 15% of 50 is 7.5." },
      { title: "50 is what percent of 200?", text: "(50 ÷ 200) × 100 = 25%. So 50 is 25% of 200." },
    ],
    faq: [
      { q: "How do I calculate a percentage?", a: "Divide the part by the whole, then multiply by 100. For example, 45 out of 60 is (45 ÷ 60) × 100 = 75%." },
      { q: "How do I find X% of a number?", a: "Multiply the number by X and divide by 100. For example, 20% of 80 is (20 × 80) ÷ 100 = 16." },
      { q: "How do I calculate percentage change?", a: "Subtract the old value from the new value, divide by the old value, and multiply by 100. A positive result is an increase; a negative result is a decrease." },
      { q: "What is a percentage point vs a percent?", a: "A percentage point is the arithmetic difference between two percentages. Going from 10% to 15% is a 5-percentage-point increase, but a 50% relative increase." },
    ],
    related: ["discount-calculator", "tip-calculator", "loan-calculator"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Health",
    kind: "widget",
    metaDescription:
      "Free BMI calculator: check your body mass index in metric or imperial units and see which weight category you fall into.",
    intro:
      "Calculate your Body Mass Index (BMI) to estimate whether your weight is in a healthy range for your height. This calculator supports both metric and imperial units and shows your BMI category instantly.",
    howItWorks: {
      formula: "BMI = weight (kg) ÷ height² (m²)  —  or  703 × weight (lb) ÷ height² (in²)",
      explanation:
        "BMI is your weight divided by your height squared. It is a simple screening measure used by health professionals to classify underweight, normal weight, overweight and obesity in adults.",
    },
    examples: [
      { title: "Metric example", text: "A 70 kg adult who is 1.75 m tall: 70 ÷ 1.75² = 70 ÷ 3.0625 = 22.9, which is in the normal-weight range." },
      { title: "Imperial example", text: "A 154 lb adult who is 69 in tall: 703 × 154 ÷ 69² = 22.7, also in the normal-weight range." },
    ],
    faq: [
      { q: "What is a healthy BMI?", a: "For most adults, a BMI between 18.5 and 24.9 is considered a healthy weight range." },
      { q: "What are the BMI categories?", a: "Under 18.5 is underweight, 18.5–24.9 normal, 25–29.9 overweight, and 30 or above is obese." },
      { q: "Is BMI accurate for everyone?", a: "BMI does not distinguish muscle from fat, so very muscular people may have a high BMI without excess body fat. It is a screening tool, not a diagnosis." },
      { q: "Is BMI different for children?", a: "Yes. For children and teens, BMI is interpreted against age- and sex-specific percentiles rather than fixed cutoffs." },
    ],
    disclaimers: ["medical"],
    related: ["calorie-calculator", "percentage-calculator", "age-calculator"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free age calculator: find your exact age in years, months and days, plus total days, weeks and months from any date of birth.",
    intro:
      "Find out exactly how old you are — or how old something is — in years, months and days. Enter a date of birth and an 'as of' date, and get the exact age plus totals in days, weeks and months.",
    howItWorks: {
      formula: "Age = (As-of date) − (Date of birth)",
      explanation:
        "The calculator subtracts the date of birth from the reference date, breaking the result into calendar years, months and remaining days, and also expresses the total elapsed time in days, weeks and months.",
    },
    examples: [
      { title: "Simple example", text: "Born 1 January 1990 and measured on 1 January 2024 gives an exact age of 34 years, 0 months and 0 days." },
      { title: "Partial year", text: "Born 15 June 1995 and measured on 10 March 2024 gives 28 years, 8 months and 24 days." },
    ],
    faq: [
      { q: "How is age calculated?", a: "Age is the elapsed time between a date of birth and a reference date, broken down into years, months and days." },
      { q: "How many days old am I?", a: "Enter your date of birth and today's date; the 'Total days' result tells you exactly how many days old you are." },
      { q: "Does this account for leap years?", a: "Yes. The calculator uses calendar dates, so leap years are included automatically." },
    ],
    related: ["date-difference-calculator", "bmi-calculator", "percentage-calculator"],
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free date difference calculator: count the days, weeks, months and years between any two dates, with a full breakdown.",
    intro:
      "Count exactly how many days are between two dates. Enter a start and end date to get the number of days, weeks, months and years between them, plus a year/month/day breakdown.",
    howItWorks: {
      formula: "Difference = (End date) − (Start date)",
      explanation:
        "The calculator counts the whole days between two dates using the calendar, then converts that total into weeks, average months and average years for convenience.",
    },
    examples: [
      { title: "Days between", text: "From 1 January 2024 to 31 January 2024 is exactly 30 days." },
      { title: "Long span", text: "From 1 January 2020 to 1 January 2024 is 1,461 days, or 4 years including one leap day." },
    ],
    faq: [
      { q: "How many days are between two dates?", a: "Subtract the earlier date from the later date; the calculator counts whole days inclusive of both calendar dates' difference." },
      { q: "How many weeks are in a year?", a: "There are 52 weeks and 1 day in a common year, or 52 weeks and 2 days in a leap year." },
      { q: "Why are months and years approximations?", a: "Months and years vary in length, so the calculator uses average values (30.4375 days per month, 365.25 days per year)." },
    ],
    related: ["age-calculator", "percentage-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free mortgage calculator: estimate your monthly mortgage payment, total interest and total repayment for any loan amount, rate and term.",
    intro:
      "Estimate your monthly mortgage payment, the total you'll repay, and the total interest you'll pay over the life of the loan. Enter the loan amount, annual interest rate and term to see results instantly.",
    howItWorks: {
      formula: "M = P · r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
      explanation:
        "M is the monthly payment, P the loan principal, r the monthly interest rate (annual rate ÷ 12), and n the number of monthly payments (years × 12). This standard amortization formula spreads principal and interest evenly across the term.",
    },
    examples: [
      { title: "Typical 30-year loan", text: "A $300,000 mortgage at 6.5% for 30 years gives a monthly payment of about $1,896.20, with roughly $382,633 paid in interest." },
      { title: "Shorter term", text: "The same $300,000 at 6.5% over 15 years raises the monthly payment but cuts total interest dramatically." },
    ],
    faq: [
      { q: "What is included in a mortgage payment?", a: "This calculator shows principal and interest only. Your actual payment may also include property taxes, homeowners insurance and, if applicable, mortgage insurance." },
      { q: "How does the loan term affect interest?", a: "Longer terms lower the monthly payment but greatly increase total interest, because you pay interest for more years." },
      { q: "What is amortization?", a: "Amortization is the gradual repayment of a loan through scheduled payments that cover both principal and interest." },
    ],
    disclaimers: ["financial"],
    affiliate: {
      cta: "Compare current mortgage rates",
      url: "https://www.quickcalc.example/go/mortgage-rates",
      note: "This calculator is for estimation only and is not a loan offer.",
    },
    related: ["loan-calculator", "compound-interest-calculator", "salary-to-hourly-calculator"],
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free loan calculator: estimate monthly payments, total interest and total repayment for personal, auto and other installment loans.",
    intro:
      "Calculate your monthly payment and total interest for any installment loan — personal, auto, student or home. Enter the loan amount, interest rate and term to see your repayment schedule totals.",
    howItWorks: {
      formula: "M = P · r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
      explanation:
        "M is the monthly payment, P the principal, r the monthly interest rate, and n the number of monthly payments. The formula calculates the fixed monthly payment needed to repay the loan with interest.",
    },
    examples: [
      { title: "Auto loan", text: "A $25,000 auto loan at 7% for 5 years gives a monthly payment of about $495.03." },
      { title: "Personal loan", text: "A $10,000 personal loan at 12% for 3 years gives a monthly payment of about $332.14." },
    ],
    faq: [
      { q: "What is the difference between APR and interest rate?", a: "APR includes the interest rate plus most loan fees, giving a truer picture of the loan's annual cost." },
      { q: "How do I lower my monthly payment?", a: "Extend the loan term, borrow less, or find a lower interest rate. Note that a longer term usually means more total interest." },
      { q: "Does this calculator include fees?", a: "No. It covers principal and interest only; origination and other fees are excluded." },
    ],
    disclaimers: ["financial"],
    affiliate: {
      cta: "Check today's personal loan rates",
      url: "https://www.quickcalc.example/go/loan-rates",
      note: "This calculator is for estimation only and is not a loan offer.",
    },
    related: ["mortgage-calculator", "compound-interest-calculator", "percentage-calculator"],
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free compound interest calculator: project investment growth with monthly contributions and see total interest earned over time.",
    intro:
      "See how your money can grow with compound interest. Enter an initial investment, annual interest rate, time horizon and optional monthly contribution to project your future value and total interest earned.",
    howItWorks: {
      formula: "A = P(1 + r/n)^(nt) + PMT · ((1 + r/n)^(nt) − 1) ÷ (r/n)",
      explanation:
        "A is the future value, P the initial principal, r the annual rate, n the number of compounding periods per year, t the years, and PMT the contribution per period. Compounding means you earn interest on previously earned interest.",
    },
    examples: [
      { title: "Long-term growth", text: "$10,000 invested at 7% compounded monthly grows to about $40,387 after 20 years, even with no further contributions." },
      { title: "With contributions", text: "Adding $200 per month to that same account dramatically increases the ending balance." },
    ],
    faq: [
      { q: "What is compound interest?", a: "Compound interest is interest earned on both your original principal and the interest that has already accumulated." },
      { q: "How does compounding frequency matter?", a: "More frequent compounding (e.g., monthly vs annually) yields slightly higher returns at the same rate." },
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is paid only on the principal, while compound interest also pays on accumulated interest." },
    ],
    disclaimers: ["financial"],
    affiliate: {
      cta: "Open a brokerage or retirement account",
      url: "https://www.quickcalc.example/go/investing",
      note: "Projections are illustrative and do not guarantee future returns.",
    },
    related: ["mortgage-calculator", "loan-calculator", "salary-to-hourly-calculator"],
  },
  {
    slug: "salary-to-hourly-calculator",
    name: "Salary to Hourly Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free salary to hourly calculator: convert an annual salary to an hourly, daily, weekly and monthly rate based on your work hours.",
    intro:
      "Convert an annual salary into an hourly rate, or see your daily, weekly and monthly pay. Enter your salary, hours per week and weeks per year to compare compensation across different schedules.",
    howItWorks: {
      formula: "Hourly rate = Annual salary ÷ (Hours per week × Weeks per year)",
      explanation:
        "Your hourly rate is your annual salary divided by the total hours you work in a year. A standard full-time schedule is 40 hours per week for 52 weeks, or 2,080 hours per year.",
    },
    examples: [
      { title: "Standard full-time", text: "A $60,000 salary at 40 hours/week for 52 weeks equals 60,000 ÷ 2,080 = $28.85 per hour." },
      { title: "Fewer weeks", text: "If you only work 48 weeks a year, the same salary is a higher effective hourly rate." },
    ],
    faq: [
      { q: "How do I convert salary to hourly?", a: "Divide your annual salary by the number of hours you work per year (hours per week × weeks per year)." },
      { q: "Does this include taxes?", a: "No. This shows gross pay before taxes, benefits and deductions." },
      { q: "How many hours are in a work year?", a: "A standard full-time schedule of 40 hours × 52 weeks is 2,080 hours per year." },
    ],
    disclaimers: ["financial"],
    related: ["percentage-calculator", "compound-interest-calculator", "mortgage-calculator"],
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    category: "Health",
    kind: "widget",
    metaDescription:
      "Free calorie calculator: estimate your BMR and daily TDEE (maintenance calories) using the Mifflin-St Jeor equation.",
    intro:
      "Estimate how many calories you burn each day. This calculator uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), and suggests calorie targets for weight loss or gain.",
    howItWorks: {
      formula: "Men: BMR = 10W + 6.25H − 5A + 5   ·   Women: BMR = 10W + 6.25H − 5A − 161",
      explanation:
        "W is weight in kg, H height in cm, and A age in years. Your BMR is multiplied by an activity factor (1.2 to 1.9) to estimate TDEE, the calories needed to maintain your current weight.",
    },
    examples: [
      { title: "Adult male", text: "A 30-year-old man who weighs 70 kg and is 175 cm tall has a BMR of about 1,649 kcal/day." },
      { title: "Adult female", text: "A 30-year-old woman of the same size has a BMR of about 1,483 kcal/day." },
    ],
    faq: [
      { q: "What is BMR?", a: "Basal Metabolic Rate is the number of calories your body burns at complete rest to maintain basic functions." },
      { q: "What is TDEE?", a: "Total Daily Energy Expenditure is your BMR plus the calories you burn through activity and digestion — roughly your maintenance calories." },
      { q: "How many calories should I eat to lose weight?", a: "A common guideline is a deficit of about 250–500 kcal/day below TDEE, but consult a professional for personal advice." },
    ],
    disclaimers: ["medical"],
    related: ["bmi-calculator", "percentage-calculator", "age-calculator"],
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free tip calculator: split a restaurant bill, calculate the tip amount and see the total per person in seconds.",
    intro:
      "Quickly work out how much to tip and split the bill fairly. Enter the bill amount, tip percentage and number of people to see the tip, the total, and the per-person amounts.",
    howItWorks: {
      formula: "Tip = Bill × (Tip % ÷ 100)",
      explanation:
        "The tip is a percentage of the pre-tax bill. The total is the bill plus tip, and dividing by the number of people gives each person's share.",
    },
    examples: [
      { title: "Standard tip", text: "A $50 bill with a 15% tip gives a $7.50 tip and a $57.50 total." },
      { title: "Splitting", text: "That same bill split 2 ways is $28.75 per person, tip included." },
    ],
    faq: [
      { q: "What is a standard tip percentage?", a: "In the US, 15–20% of the pre-tax bill is customary for table service." },
      { q: "Do you tip on tax?", a: "Conventionally, tips are calculated on the pre-tax subtotal." },
      { q: "How do I split a bill?", a: "Divide the total (bill plus tip) by the number of people, or use the per-person results above." },
    ],
    related: ["discount-calculator", "percentage-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free discount calculator: find the final price after a percentage discount and see exactly how much you save.",
    intro:
      "Find out how much you'll save and what you'll pay after a percentage discount. Enter the original price and the discount percentage to see your savings and the final price instantly.",
    howItWorks: {
      formula: "Savings = Price × (Discount % ÷ 100)",
      explanation:
        "The amount saved is the original price multiplied by the discount percentage. Subtract the savings from the original price to get the final price.",
    },
    examples: [
      { title: "Percent off", text: "A $100 item with 20% off saves you $20 and costs $80." },
      { title: "Stacked sale", text: "A $250 item at 30% off saves $75 and costs $175." },
    ],
    faq: [
      { q: "How do I calculate 20% off?", a: "Multiply the price by 0.20 to get the savings, then subtract from the original price." },
      { q: "What does 'percent off' mean?", a: "It means the price is reduced by that percentage of the original price." },
      { q: "How do I find the original price from a sale price?", a: "Divide the sale price by (1 − discount percentage). For example, $80 after 20% off is $80 ÷ 0.80 = $100." },
    ],
    related: ["percentage-calculator", "tip-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free fuel cost calculator: estimate trip fuel usage, total gas cost and cost per mile for any distance and MPG.",
    intro:
      "Estimate how much a trip will cost in fuel. Enter the distance, your vehicle's fuel efficiency and the fuel price to see gallons needed, total cost and cost per mile.",
    howItWorks: {
      formula: "Gallons = Distance ÷ MPG   ·   Cost = Gallons × Price per gallon",
      explanation:
        "Divide the trip distance by your fuel efficiency (miles per gallon) to get the gallons needed, then multiply by the price per gallon for the total cost.",
    },
    examples: [
      { title: "Road trip", text: "A 300-mile trip at 25 MPG uses 12 gallons; at $3.50/gallon the fuel costs $42." },
      { title: "Cost per mile", text: "At 25 MPG and $3.50/gallon, fuel costs about $0.14 per mile." },
    ],
    faq: [
      { q: "How do I calculate fuel cost for a trip?", a: "Divide the distance by your MPG, then multiply by the fuel price per gallon." },
      { q: "What is good fuel efficiency?", a: "Modern compact cars often exceed 30 MPG, while trucks and SUVs are typically lower." },
      { q: "Does this work for km and liters?", a: "This calculator uses miles and US gallons. Use the unit converters to convert km to miles or liters to gallons first." },
    ],
    related: ["discount-calculator", "percentage-calculator", "date-difference-calculator"],
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "Education",
    kind: "gpa",
    metaDescription:
      "Free GPA calculator: compute your weighted grade point average on a 4.0 scale by entering your courses and credits.",
    intro:
      "Calculate your grade point average (GPA) on a standard 4.0 scale. Add your courses, select the letter grade and enter the credit hours for each, and the calculator computes your weighted GPA.",
    howItWorks: {
      formula: "GPA = Σ(grade points × credits) ÷ Σ(credits)",
      explanation:
        "Each letter grade maps to grade points (A = 4.0, B = 3.0, etc.). Multiply each course's grade points by its credit hours, sum the results, and divide by the total credit hours.",
    },
    examples: [
      { title: "Weighted average", text: "An A (3 credits), a B (3 credits) and an A- (4 credits) gives (12 + 9 + 14.8) ÷ 10 = 3.58 GPA." },
      { title: "Unweighted", text: "If all courses carry equal weight, GPA is simply the average of the grade points." },
    ],
    faq: [
      { q: "What is a GPA?", a: "Grade Point Average is the weighted average of your course grades, typically on a 0.0–4.0 scale." },
      { q: "What is a good GPA?", a: "A 3.0 (B average) is solid, 3.5 or above is strong, and 4.0 is a perfect straight-A record." },
      { q: "What is a weighted GPA?", a: "Weighted GPAs give extra points for honors or AP/IB courses, often on a scale above 4.0. This calculator uses a standard unweighted 4.0 scale." },
    ],
    related: ["percentage-calculator", "age-calculator", "salary-to-hourly-calculator"],
  },
];

export function getTool(slug: string): ToolContent | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
