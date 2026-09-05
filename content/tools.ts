// Per-tool editorial content. This is what separates a rankable, AdSense-approvable
// page from a bare calculator widget ("thin content"). Each entry ships original
// intro, formula explanation, worked examples and an FAQ.

export type ToolCategory = "Everyday" | "Finance" | "Health" | "Education" | "Home";

export interface ToolContent {
  slug: string;
  name: string;
  category: ToolCategory;
  kind: "widget" | "gpa" | "currency" | "timezone";
  metaDescription: string;
  intro: string;
  howItWorks: { formula: string; explanation: string };
  examples: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  disclaimers?: ("medical" | "financial")[];
  affiliate?: { cta: string; url: string; note: string };
  sources?: { label: string; url: string }[];
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
    related: ["calorie-calculator", "percentage-calculator", "body-fat-calculator"],
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
      "Free date difference calculator: count the days, weeks, months and years between any two dates, with a full breakdown. Fast, free and accurate.",
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
    related: ["age-calculator", "percentage-calculator", "time-zone-converter"],
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
      { title: "Typical 30-year loan", text: "A 300,000 mortgage at 6.5% for 30 years gives a monthly payment of about 1,896.20, with roughly 382,633 paid in interest." },
      { title: "Shorter term", text: "The same 300,000 at 6.5% over 15 years raises the monthly payment but cuts total interest dramatically." },
    ],
    faq: [
      { q: "What is included in a mortgage payment?", a: "This calculator shows principal and interest only. Your actual payment may also include property taxes, homeowners insurance and, if applicable, mortgage insurance." },
      { q: "How does the loan term affect interest?", a: "Longer terms lower the monthly payment but greatly increase total interest, because you pay interest for more years." },
      { q: "What is amortization?", a: "Amortization is the gradual repayment of a loan through scheduled payments that cover both principal and interest." },
    ],
    disclaimers: ["financial"],
    related: ["loan-calculator", "compound-interest-calculator", "debt-to-income-calculator"],
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
      { title: "Auto loan", text: "A 25,000 auto loan at 7% for 5 years gives a monthly payment of about 495.03." },
      { title: "Personal loan", text: "A 10,000 personal loan at 12% for 3 years gives a monthly payment of about 332.14." },
    ],
    faq: [
      { q: "What is the difference between APR and interest rate?", a: "APR includes the interest rate plus most loan fees, giving a truer picture of the loan's annual cost." },
      { q: "How do I lower my monthly payment?", a: "Extend the loan term, borrow less, or find a lower interest rate. Note that a longer term usually means more total interest." },
      { q: "Does this calculator include fees?", a: "No. It covers principal and interest only; origination and other fees are excluded." },
    ],
    disclaimers: ["financial"],
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
      { title: "Long-term growth", text: "10,000 invested at 7% compounded monthly grows to about 40,387 after 20 years, even with no further contributions." },
      { title: "With contributions", text: "Adding 200 per month to that same account dramatically increases the ending balance." },
    ],
    faq: [
      { q: "What is compound interest?", a: "Compound interest is interest earned on both your original principal and the interest that has already accumulated." },
      { q: "How does compounding frequency matter?", a: "More frequent compounding (e.g., monthly vs annually) yields slightly higher returns at the same rate." },
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is paid only on the principal, while compound interest also pays on accumulated interest." },
    ],
    disclaimers: ["financial"],
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
      { title: "Standard full-time", text: "A 60,000 salary at 40 hours/week for 52 weeks equals 60,000 ÷ 2,080 = 28.85 per hour." },
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
      "Free calorie calculator: estimate your BMR and daily TDEE (maintenance calories) using the Mifflin-St Jeor equation — accurate for weight loss or gain.",
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
      "Free tip calculator: split a restaurant bill, calculate the tip amount and see the total per person in seconds. Works with any tip percentage.",
    intro:
      "Quickly work out how much to tip and split the bill fairly. Enter the bill amount, tip percentage and number of people to see the tip, the total, and the per-person amounts.",
    howItWorks: {
      formula: "Tip = Bill × (Tip % ÷ 100)",
      explanation:
        "The tip is a percentage of the pre-tax bill. The total is the bill plus tip, and dividing by the number of people gives each person's share.",
    },
    examples: [
      { title: "Standard tip", text: "A bill of 50 with a 15% tip gives a 7.50 tip and a 57.50 total." },
      { title: "Splitting", text: "That same bill split 2 ways is 28.75 per person, tip included." },
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
      "Free discount calculator: find the final price after a percentage discount and see exactly how much you save. Great for sales and deals.",
    intro:
      "Find out how much you'll save and what you'll pay after a percentage discount. Enter the original price and the discount percentage to see your savings and the final price instantly.",
    howItWorks: {
      formula: "Savings = Price × (Discount % ÷ 100)",
      explanation:
        "The amount saved is the original price multiplied by the discount percentage. Subtract the savings from the original price to get the final price.",
    },
    examples: [
      { title: "Percent off", text: "An item priced 100 with 20% off saves 20 and costs 80." },
      { title: "Stacked sale", text: "An item priced 250 at 30% off saves 75 and costs 175." },
    ],
    faq: [
      { q: "How do I calculate 20% off?", a: "Multiply the price by 0.20 to get the savings, then subtract from the original price." },
      { q: "What does 'percent off' mean?", a: "It means the price is reduced by that percentage of the original price." },
      { q: "How do I find the original price from a sale price?", a: "Divide the sale price by (1 − discount percentage). For example, 80 after 20% off is 80 ÷ 0.80 = 100." },
    ],
    related: ["percentage-calculator", "tip-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free fuel cost calculator: estimate trip fuel usage and total cost in US (miles/MPG) or metric (km/km/L) units, including fuel price per gallon or litre.",
    intro:
      "Estimate how much a trip will cost in fuel. Choose US (miles, MPG, price per gallon) or metric (km, km/L, price per liter) units, then enter your distance, efficiency and fuel price to see the fuel needed and total cost.",
    howItWorks: {
      formula: "Fuel needed = Distance ÷ Efficiency   ·   Cost = Fuel needed × Price",
      explanation:
        "Divide the trip distance by your fuel efficiency to get the fuel volume needed (gallons in US units, liters in metric), then multiply by the fuel price (per gallon or per liter) for the total cost.",
    },
    examples: [
      { title: "US example", text: "A 300-mile trip at 25 MPG uses 12 gallons; at 3.50 per gallon the fuel costs 42." },
      { title: "Metric example", text: "A 300 km trip at 15 km/L uses 20 liters; at 2,500 per liter the fuel costs 50,000." },
    ],
    faq: [
      { q: "How do I calculate fuel cost for a trip?", a: "Divide the distance by your fuel efficiency (MPG or km/L), then multiply by the fuel price (per gallon or per liter)." },
      { q: "What is good fuel efficiency?", a: "Modern compact cars often exceed 30 MPG (about 12–13 km/L), while trucks and SUVs are typically lower." },
      { q: "Does this work for km and liters?", a: "Yes. Switch the Units selector to Metric to use kilometers, km/L and a price per liter." },
    ],
    related: ["discount-calculator", "percentage-calculator", "date-difference-calculator"],
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "Education",
    kind: "gpa",
    metaDescription:
      "Free GPA calculator: compute your weighted grade point average on a 4.0 scale by entering your courses and credits — with instant letter-grade results.",
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
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free retirement calculator: estimate how much your savings will grow by retirement age with annual contributions and compound returns.",
    intro:
      "Estimate how much you'll have saved by retirement. Enter your current age, target retirement age, current savings, annual contribution and expected annual return to project your retirement nest egg.",
    howItWorks: {
      formula: "FV = P(1+r)ⁿ + C · ((1+r)ⁿ − 1) ÷ r",
      explanation:
        "P is current savings, C the annual contribution, r the annual return rate, and n the number of years until retirement. The formula compounds your current savings and contributions with interest.",
    },
    examples: [
      { title: "Example", text: "Starting at 30 with 10,000 saved, adding 5,000 a year at 7% until 65 grows to roughly 800,000." },
    ],
    faq: [
      { q: "How much do I need to retire?", a: "A common rule of thumb is 25× your annual expenses, but it depends on lifestyle, location and other income." },
      { q: "Does this account for inflation?", a: "No. Use a real (inflation-adjusted) return rate, e.g. 5–6%, to see today's purchasing power." },
      { q: "What is a safe withdrawal rate?", a: "The 4% rule suggests withdrawing about 4% of your portfolio in the first year, adjusted for inflation." },
    ],
    disclaimers: ["financial"],
    related: ["compound-interest-calculator", "utt-calculator", "inflation-calculator"],
  },
  {
    slug: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    category: "Health",
    kind: "widget",
    metaDescription:
      "Free pregnancy due date calculator: estimate your baby's due date and conception date from the first day of your last period.",
    intro:
      "Estimate your baby's due date and conception date from the first day of your last menstrual period (LMP), using the standard Naegele's rule of 280 days from LMP.",
    howItWorks: {
      formula: "Due date = LMP + 280 days",
      explanation:
        "Naegele's rule adds 280 days (40 weeks) to the first day of your last period. Conception is estimated at around 14 days after LMP.",
    },
    examples: [
      { title: "Example", text: "If your LMP was 1 January 2024, the estimated due date is around 7 October 2024." },
    ],
    faq: [
      { q: "How accurate is the due date?", a: "Only about 4–5% of babies are born exactly on the due date; it is an estimate." },
      { q: "How is pregnancy counted?", a: "Pregnancy is dated from the first day of your last period, about two weeks before conception." },
      { q: "How many weeks is a full-term pregnancy?", a: "A full-term pregnancy is about 40 weeks (280 days) from the last period." },
    ],
    disclaimers: ["medical"],
    related: ["bmi-calculator", "calorie-calculator", "age-calculator"],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "Health",
    kind: "widget",
    metaDescription:
      "Free body fat percentage calculator using the US Navy method — estimate body fat from height, neck, waist and hip measurements.",
    intro:
      "Estimate your body fat percentage using the US Navy circumference method. Enter your sex, height, and neck, waist (and hip for women) measurements.",
    howItWorks: {
      formula: "US Navy circumference formula (log₁₀-based)",
      explanation:
        "The US Navy method estimates body density from body circumferences and height, then converts it to a body fat percentage. Measurements are entered in centimeters and converted to inches internally.",
    },
    examples: [
      { title: "Male example", text: "A 175 cm man with a 38 cm neck and 90 cm waist has an estimated body fat of about 14%." },
    ],
    faq: [
      { q: "How accurate is the US Navy method?", a: "It is a reasonable estimate (±3–5%) but not as precise as DEXA or hydrostatic weighing." },
      { q: "What is a healthy body fat percentage?", a: "For men, roughly 14–24% is average; for women, roughly 21–31%." },
      { q: "Why do women need a hip measurement?", a: "The female formula includes hip circumference because women store fat differently." },
    ],
    disclaimers: ["medical"],
    related: ["bmi-calculator", "calorie-calculator", "pregnancy-due-date-calculator"],
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    category: "Home",
    kind: "widget",
    metaDescription:
      "Free paint calculator: estimate how many gallons of paint you need for a room or wall, including coats and coverage, so you buy the right amount.",
    intro:
      "Estimate how much paint you need. Enter the wall area, number of coats and the paint's coverage to see the gallons (and liters) required.",
    howItWorks: {
      formula: "Gallons = (Area × Coats) ÷ Coverage",
      explanation:
        "Multiply the area by the number of coats, then divide by the paint's coverage (square feet per gallon). Typical coverage is about 350 ft² per gallon.",
    },
    examples: [
      { title: "Example", text: "400 sq ft of wall with 2 coats at 350 ft²/gallon needs about 2.3 gallons — round up to 3 gallons." },
    ],
    faq: [
      { q: "How much area does a gallon of paint cover?", a: "Typically 250–400 square feet per coat, depending on surface and paint." },
      { q: "Should I include two coats?", a: "Yes, most jobs need two coats for even coverage and full color." },
      { q: "How do I calculate wall area?", a: "Multiply wall width by height, and subtract windows and doors." },
    ],
    related: ["amps-to-watts-calculator", "percentage-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "amps-to-watts-calculator",
    name: "Amps to Watts Calculator",
    category: "Home",
    kind: "widget",
    metaDescription:
      "Free amps to watts calculator: convert electrical current (amps) and voltage into power in watts, kilowatts and kWh. Fast for any appliance or circuit.",
    intro:
      "Convert amps and volts into watts. Enter the voltage and current to see power in watts, kilowatts and the energy used over one hour.",
    howItWorks: {
      formula: "Watts = Volts × Amps",
      explanation:
        "Electrical power (watts) equals voltage (volts) multiplied by current (amps). Kilowatts are watts divided by 1,000.",
    },
    examples: [
      { title: "Example", text: "A 230-volt appliance drawing 10 amps uses 2,300 watts, or 2.3 kW." },
    ],
    faq: [
      { q: "How do I convert amps to watts?", a: "Multiply amps by volts: watts = amps × volts." },
      { q: "What is a kilowatt-hour?", a: "A kWh is the energy used by a 1,000-watt device running for one hour." },
      { q: "What voltage should I use?", a: "Household mains is 230 V in Tanzania and most of the world, and 120 V in North America." },
    ],
    related: ["paint-calculator", "percentage-calculator", "discount-calculator"],
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    category: "Finance",
    kind: "currency",
    metaDescription:
      "Free currency converter with live exchange rates: convert between USD, TZS and 100+ other world currencies instantly. No sign-up needed.",
    intro:
      "Convert between currencies using live exchange rates. Choose your source and target currencies and enter an amount — results update instantly. Rates refresh on each page load.",
    howItWorks: {
      formula: "Converted = Amount × Exchange rate",
      explanation:
        "The converter fetches the latest exchange rates and multiplies your amount by the rate to the target currency. Rates are indicative and may differ slightly from your bank.",
    },
    examples: [
      { title: "Example", text: "At a rate of 2,500 TZS per USD, 100 USD equals 250,000 TZS." },
    ],
    faq: [
      { q: "Are these the exact bank rates?", a: "No. Displayed rates are indicative market rates; banks and exchanges may charge a margin." },
      { q: "How often do rates update?", a: "The converter fetches fresh rates each time the page loads." },
      { q: "Which currencies are supported?", a: "100+ currencies, including USD and TZS." },
    ],
    disclaimers: ["financial"],
    related: ["loan-calculator", "compound-interest-calculator", "tip-calculator"],
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    category: "Everyday",
    kind: "timezone",
    metaDescription:
      "Free time zone converter: find the current time in any city or time zone instantly, with world clock support and live clock comparisons.",
    intro:
      "Convert the time between two time zones. Pick a source and target time zone and a time to see the equivalent time in the other zone.",
    howItWorks: {
      formula: "Target time = source time + (target offset − source offset)",
      explanation:
        "The converter uses the browser's built-in time zone database to account for each zone's UTC offset and daylight-saving rules.",
    },
    examples: [
      { title: "Example", text: "At 9:00 AM in New York, it's 5:00 PM in Dar es Salaam (EAT, UTC+3)." },
    ],
    faq: [
      { q: "Does it account for daylight saving?", a: "Yes, the converter uses each time zone's current offset including daylight-saving rules." },
      { q: "What time is it in Dar es Salaam?", a: "Tanzania is UTC+3 (East Africa Time) year-round, with no daylight saving." },
      { q: "What is UTC?", a: "Coordinated Universal Time is the world time standard that all time zones are offset from." },
    ],
    related: ["age-calculator", "date-difference-calculator", "percentage-calculator"],
  },
  {
    slug: "tanzania-paye-calculator",
    name: "Tanzania PAYE Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania PAYE calculator: work out your take-home pay after income tax. Enter your gross monthly salary in TZS and see your net pay.",
    intro:
      "Calculate your take-home pay in Tanzania after PAYE income tax. Enter your gross monthly salary in Tanzanian Shillings to see your monthly tax and net pay, based on the current TRA resident tax bands.",
    howItWorks: {
      formula: "Progressive bands: 0% ≤270k · 8% 270–520k · 20% 520–760k · 25% 760k–1M · 30% >1M (monthly)",
      explanation:
        "PAYE (Pay As You Earn) is withheld from employment income each month. Tax is calculated progressively: each band's rate applies only to income within that band. The first 270,000 TZS per month is tax-free.",
    },
    examples: [
      { title: "Example", text: "A 1,000,000 TZS gross salary is taxed 128,000 TZS, giving about 872,000 TZS take-home per month." },
    ],
    faq: [
      { q: "What is PAYE?", a: "Pay As You Earn is the income tax deducted from employment income every month before you're paid." },
      { q: "What are the Tanzania PAYE tax bands?", a: "For residents: 0% up to 270,000 TZS, 8% on 270,001–520,000, 20% on 520,001–760,000, 25% on 760,001–1,000,000, and 30% above 1,000,000 TZS per month." },
      { q: "Does this include NSSF and other deductions?", a: "No. This shows PAYE income tax only. NSSF (10% of salary) and other deductions are separate." },
      { q: "What is the tax-free threshold in Tanzania?", a: "The first 270,000 TZS of monthly income is taxed at 0%." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "Tanzania Revenue Authority (TRA)", url: "https://www.tra.go.tz" }],
    related: ["tanzania-vat-calculator", "loan-calculator", "retirement-calculator"],
  },
  {
    slug: "mobile-money-fee-calculator",
    name: "Mobile Money Fee Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania mobile money fee calculator: see M-Pesa, Airtel, Mixx, T-Pesa and HaloPesa send and withdrawal charges before you get charged.",
    intro:
      "Work out the real cost of a mobile money transaction in Tanzania. Pick M-Pesa, Airtel Money or Mixx by Yas, choose send or withdraw, and enter an amount to see the fee including the 10% excise duty, 18% VAT and the government withdrawal levy where it applies.",
    howItWorks: {
      formula: "Total = (operator fee × 1.298) + withdrawal levy",
      explanation:
        "Tanzania adds a 10% excise duty and 18% VAT on top of the operator's base fee (so the taxed fee is about 1.298× the published fee). Cashing out at an agent also attracts a banded government withdrawal levy; sending money does not.",
    },
    examples: [
      { title: "Withdraw example", text: "Withdrawing 10,000 TZS from M-Pesa at an agent costs about 1,552 TZS (base fee 1,450 + levy 102), so you'd receive about 8,448 TZS." },
      { title: "Send example", text: "Sending 50,000 TZS via Airtel Money costs about 883 TZS (base 680 + tax 203), so you'd pay 50,883 TZS." },
    ],
    faq: [
      { q: "How are mobile money fees calculated in Tanzania?", a: "The operator charges a base fee by amount band, then Tanzania adds a 10% excise duty and 18% VAT (about 1.298× the base fee). Withdrawing cash at an agent also adds a banded government levy." },
      { q: "Is there a levy on sending money?", a: "No. The government withdrawal levy applies only to agent cash-out; sending money (P2P, cross-network, to bank) is exempt from the levy." },
      { q: "Which provider is cheapest?", a: "It depends on the amount. M-Pesa is often cheapest for small sends (free up to 10,000 TZS); use the calculator to compare for your exact amount." },
      { q: "Are these fees exact?", a: "Fees change with operator tariffs and government budgets. The figures are a snapshot — always verify with your operator before a large transaction." },
    ],
    disclaimers: ["financial"],
    sources: [
      { label: "Vodacom M-Pesa", url: "https://www.vodacom.co.tz" },
      { label: "Airtel Money", url: "https://www.airtel.co.tz" },
    ],
    related: ["currency-converter", "tanzania-paye-calculator", "loan-calculator"],
  },
  {
    slug: "tanzania-vat-calculator",
    name: "Tanzania VAT Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania VAT calculator: add or remove 18% VAT on any amount in TZS, showing the VAT amount and total. Accurate for invoices and pricing.",
    intro:
      "Work out Tanzania's Value Added Tax (VAT) quickly. Choose to add VAT to a price (excl. VAT) or remove VAT from a price (incl. VAT), enter the amount and see the VAT and the total. The standard VAT rate is 18%.",
    howItWorks: {
      formula: "Add: total = amount × (1 + rate/100)  ·  Remove: net = amount ÷ (1 + rate/100)",
      explanation:
        "To add VAT, multiply the net amount by (1 + rate/100). To remove VAT from a gross amount, divide by (1 + rate/100) to get the net amount; the VAT is the difference. Tanzania's standard VAT rate is 18%.",
    },
    examples: [
      { title: "Adding VAT", text: "An item priced 100,000 TZS excl. VAT plus 18% is 118,000 TZS, with 18,000 TZS VAT." },
      { title: "Removing VAT", text: "A 118,000 TZS gross price is 100,000 TZS excl. VAT, with 18,000 TZS VAT." },
    ],
    faq: [
      { q: "What is the VAT rate in Tanzania?", a: "The standard VAT rate in Tanzania is 18%, with some goods and services zero-rated or exempt." },
      { q: "How do I add VAT to a price?", a: "Multiply the net amount by 1.18. For example, 100,000 × 1.18 = 118,000." },
      { q: "How do I remove VAT from a price?", a: "Divide the gross amount by 1.18 to get the net amount; the VAT is the difference." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "Tanzania Revenue Authority (TRA)", url: "https://www.tra.go.tz" }],
    related: ["tanzania-paye-calculator", "discount-calculator", "percentage-calculator"],
  },
  {
    slug: "average-calculator",
    name: "Average Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free average calculator: enter any list of numbers to instantly find the mean, sum and count. Clear steps and examples, accurate and free — no sign-up needed.",
    intro:
      "Calculate the average (mean) of any list of numbers. Enter the numbers separated by commas and see the average, total and count instantly.",
    howItWorks: {
      formula: "Average = Sum of numbers ÷ Count",
      explanation:
        "Add up all the numbers and divide by how many there are. This is the arithmetic mean — the most common form of average.",
    },
    examples: [
      { title: "Example", text: "The average of 10, 20, 30 and 40 is (10 + 20 + 30 + 40) ÷ 4 = 25." },
    ],
    faq: [
      { q: "How do I calculate an average?", a: "Add all the numbers together and divide by the total count. For example, 10 + 20 + 30 = 60, and 60 ÷ 3 = 20." },
      { q: "What is the difference between mean, median and mode?", a: "The mean is the average from dividing the sum by the count. The median is the middle value, and the mode is the most common value." },
      { q: "Can I enter negative numbers?", a: "Yes, negative numbers are included in the average." },
    ],
    related: ["percentage-calculator", "gpa-calculator", "standard-deviation-calculator"],
  },
  {
    slug: "utt-calculator",
    name: "UTT Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free UTT AMIS unit trust calculator — project the future value of your UTT investment in Tanzania with monthly contributions.",
    intro:
      "Estimate how your money could grow in a UTT AMIS unit trust fund. Pick a fund, enter your initial investment and an optional monthly contribution, and see the projected value over time.",
    howItWorks: {
      formula: "FV = P(1 + r/12)^(12n) + PMT × ((1 + r/12)^(12n) − 1) ÷ (r/12)",
      explanation:
        "Your investment grows with compound interest credited monthly. P is the initial amount, PMT the monthly contribution, r the annual return, and n the number of years.",
    },
    examples: [
      { title: "Example", text: "1,000,000 TZS in the Money Market Fund at 8% for 5 years grows to about 1,489,846 TZS." },
    ],
    faq: [
      { q: "What is UTT AMIS?", a: "UTT Asset Management and Investor Services (UTT AMIS) is Tanzania's government-backed investment company that manages collective investment schemes (unit trusts)." },
      { q: "Which UTT fund is right for me?", a: "Money Market and Liquid funds suit short-term, low-risk goals, while Balanced and Jikimu funds suit longer-term goals that can tolerate more risk." },
      { q: "Are these returns guaranteed?", a: "No. The figures are illustrative. Unit trust returns vary with market performance — always verify current rates with UTT AMIS." },
    ],
    disclaimers: ["financial"],
    related: ["compound-interest-calculator", "retirement-calculator", "mobile-money-fee-calculator"],
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    category: "Everyday",
    kind: "widget",
    metaDescription:
      "Free standard deviation calculator: find the mean and population or sample standard deviation of a set of numbers, with clear step-by-step working.",
    intro:
      "Calculate the standard deviation and mean of a set of numbers. Enter the values separated by commas to see the population and sample standard deviation.",
    howItWorks: {
      formula: "σ = √(Σ(x − μ)² ÷ N)",
      explanation:
        "Standard deviation measures how spread out the numbers are from the mean. Population deviation divides by N; sample deviation divides by N−1.",
    },
    examples: [
      { title: "Example", text: "For 10, 12, 23, 23, 16 the mean is 16.8 and the population standard deviation is about 5.42." },
    ],
    faq: [
      { q: "What is standard deviation?", a: "It measures how much a set of numbers varies from their average — a higher value means more spread." },
      { q: "Population vs sample?", a: "Use population when you have all values; use sample when your numbers are a sample of a larger group (divides by n−1)." },
      { q: "What does a high standard deviation mean?", a: "The values are more spread out from the mean; a low one means they cluster close to the average." },
    ],
    related: ["average-calculator", "percentage-calculator", "gpa-calculator"],
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free inflation calculator: see how inflation affects purchasing power over time — future value or what money is worth today. Adjust for any rate.",
    intro:
      "See how inflation affects the value of money. Enter an amount, an inflation rate and a number of years to calculate its future value, or its value today.",
    howItWorks: {
      formula: "Future = amount × (1 + r)ⁿ  ·  Present = amount ÷ (1 + r)ⁿ",
      explanation:
        "Money loses purchasing power as prices rise. The future value multiplies by (1 + r)ⁿ; the value today divides by the same factor.",
    },
    examples: [
      { title: "Example", text: "100,000 at 5% inflation for 10 years grows to about 162,889 in future money." },
    ],
    faq: [
      { q: "What is inflation?", a: "Inflation is the rate at which the general level of prices rises, reducing the purchasing power of money." },
      { q: "How do I calculate future value?", a: "Multiply the amount by (1 + inflation rate) raised to the number of years." },
      { q: "What is a typical inflation rate?", a: "It varies by country and year; enter your best estimate for planning." },
    ],
    disclaimers: ["financial"],
    related: ["compound-interest-calculator", "retirement-calculator", "salary-to-hourly-calculator"],
  },
  {
    slug: "debt-to-income-calculator",
    name: "Debt-to-Income Ratio Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free debt-to-income (DTI) ratio calculator: enter monthly debt and gross income to instantly find the % of income going to debt, with healthy-range guidance.",
    intro:
      "Calculate your debt-to-income (DTI) ratio. Enter your total monthly debt payments and your gross monthly income to see the percentage of income that goes to debt.",
    howItWorks: {
      formula: "DTI = (Monthly debt ÷ Gross monthly income) × 100",
      explanation:
        "Lenders use DTI to assess affordability. A lower DTI is better — below 36% is generally considered healthy.",
    },
    examples: [
      { title: "Example", text: "500 in monthly debt against 2,000 gross income is a 25% DTI." },
    ],
    faq: [
      { q: "What is a good DTI ratio?", a: "A DTI below 36% is generally considered healthy; above 50% is high and can make borrowing harder." },
      { q: "What counts as monthly debt?", a: "Recurring obligations like loans, credit-card minimums and other fixed payments." },
      { q: "Why does DTI matter?", a: "Lenders use it to decide whether you can afford a new loan." },
    ],
    disclaimers: ["financial"],
    related: ["loan-calculator", "mortgage-calculator", "compound-interest-calculator"],
  },
  {
    slug: "tanzania-nssf-calculator",
    name: "Tanzania NSSF Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania NSSF calculator: see your employee and employer NSSF contributions and net take-home pay after tax. No sign-up needed.",
    intro:
      "Work out your National Social Security Fund (NSSF) deductions and take-home pay in Tanzania. Enter your gross monthly salary to see the employee and employer contributions (10% each, 20% total) and your net pay after NSSF and PAYE.",
    howItWorks: {
      formula: "NSSF = 10% (employee) + 10% (employer) = 20% of gross · PAYE on (gross − employee NSSF) · Net = gross − employee NSSF − PAYE",
      explanation:
        "NSSF is a mandatory pension scheme for private-sector employees. Each month 10% of your gross salary is deducted as the employee share and your employer contributes a matching 10% (20% total). Your employee NSSF is deducted before PAYE, so it reduces your taxable income.",
    },
    examples: [
      { title: "Example", text: "A 1,000,000 TZS gross salary deducts 100,000 TZS employee NSSF and the employer adds 100,000 TZS, giving about 772,000 TZS take-home after PAYE." },
    ],
    faq: [
      { q: "What is NSSF?", a: "The National Social Security Fund is Tanzania's mandatory pension scheme for private-sector and informal employees." },
      { q: "How much is NSSF in Tanzania?", a: "20% of gross monthly salary in total — 10% from the employee and 10% from the employer." },
      { q: "Does NSSF reduce my tax?", a: "Yes. Your employee NSSF contribution is deducted from your salary before PAYE is calculated, lowering your taxable income." },
      { q: "Is there a salary cap for NSSF?", a: "No — NSSF is calculated on your full gross salary with no ceiling (Tanzania)." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "National Social Security Fund (NSSF)", url: "https://www.nssf.go.tz" }],
    related: ["tanzania-paye-calculator", "tanzania-psssf-calculator", "mobile-money-fee-calculator"],
  },
  {
    slug: "tanzania-psssf-calculator",
    name: "Tanzania PSSSF Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania PSSSF calculator for public servants: 5% employee + 15% employer contributions, net take-home pay and an estimate of your retirement pension.",
    intro:
      "Calculate your Public Service Social Security Fund (PSSSF) deductions, net take-home pay and an estimate of your retirement pension. Enter your gross monthly salary to see your 5% employee and 15% employer contributions, then switch to retirement mode to estimate your pension.",
    howItWorks: {
      formula: "PSSSF = 5% (employee) + 15% (employer) = 20% of salary · Pension = (1/580) × months of service × APE",
      explanation:
        "PSSSF is the mandatory pension fund for public-sector employees. 5% of your salary is deducted as the employee share and your employer contributes 15% (20% total). The retirement pension is estimated using 1/580 × months of service × your annual pensionable emoluments (APE).",
    },
    examples: [
      { title: "Paycheck example", text: "A 1,000,000 TZS gross salary deducts 50,000 TZS employee PSSSF and the employer adds 150,000 TZS, giving about 824,500 TZS take-home after PAYE." },
      { title: "Retirement example", text: "180 months of service with an annual pensionable emolument of 12,000,000 TZS gives an estimated gratuity of about 3,724,000 TZS." },
    ],
    faq: [
      { q: "What is PSSSF?", a: "The Public Service Social Security Fund is Tanzania's mandatory pension scheme for public-sector employees." },
      { q: "How is PSSSF different from NSSF?", a: "NSSF covers private-sector employees (10% employee / 10% employer), while PSSSF covers public servants (5% employee / 15% employer). Both total 20%." },
      { q: "How is my PSSSF pension calculated?", a: "It's estimated as (1/580) × months of service × your annual pensionable emoluments, paid as a commuted gratuity." },
      { q: "When can I retire under PSSSF?", a: "Compulsory retirement is age 60; you may retire voluntarily from age 55 with at least 180 months (15 years) of contributions." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "Public Service Social Security Fund (PSSSF)", url: "https://www.psssf.go.tz" }],
    related: ["tanzania-paye-calculator", "tanzania-nssf-calculator", "retirement-calculator"],
  },
  {
    slug: "tanzania-employer-cost-calculator",
    name: "Tanzania Employer Cost Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania employer cost calculator: see the true cost of hiring staff with NSSF, SDL and WCF employer contributions. No sign-up needed.",
    intro:
      "Work out what it actually costs to employ someone in Tanzania. Enter the gross monthly salary to see the employer contributions — NSSF (10%), Skills Development Levy (3.5% where it applies) and Workers Compensation Fund (0.5%) — and the total cost per employee.",
    howItWorks: {
      formula: "On-cost = NSSF 10% + SDL 3.5% (≥10 staff) + WCF 0.5% ≈ 14% · Total = salary + on-cost",
      explanation:
        "Beyond the gross salary, Tanzanian employers pay three statutory contributions: 10% NSSF (pension), 3.5% Skills Development Levy (only for employers with 10+ staff), and 0.5% Workers Compensation Fund. Together they add about 14% on top of salary.",
    },
    examples: [
      { title: "Example", text: "Employing someone on 1,000,000 TZS gross costs about 1,140,000 TZS once you add NSSF (100,000), SDL (35,000) and WCF (5,000)." },
      { title: "Under 10 staff", text: "With fewer than 10 employees, SDL doesn't apply, so the on-cost is NSSF 10% + WCF 0.5% = 10.5%, or 1,105,000 TZS on a 1,000,000 TZS salary." },
    ],
    faq: [
      { q: "What does it cost to employ someone in Tanzania?", a: "Roughly 14% above gross salary: 10% NSSF, 3.5% SDL (if 10+ employees) and 0.5% WCF, all paid by the employer." },
      { q: "Who pays SDL and WCF?", a: "Both are employer-only contributions — they are not deducted from the employee's pay." },
      { q: "When does SDL apply?", a: "The Skills Development Levy applies to employers with 10 or more employees, at 3.5% of total gross monthly payroll." },
      { q: "Are these rates current?", a: "Rates change over time. This shows the current NSSF 10%, SDL 3.5% and WCF 0.5% — always verify with the relevant authority." },
    ],
    disclaimers: ["financial"],
    sources: [
      { label: "National Social Security Fund (NSSF)", url: "https://www.nssf.go.tz" },
      { label: "Tanzania Revenue Authority (TRA)", url: "https://www.tra.go.tz" },
    ],
    related: ["tanzania-nssf-calculator", "tanzania-psssf-calculator", "tanzania-wcf-calculator"],
  },
  {
    slug: "tanzania-sdl-calculator",
    name: "Tanzania SDL Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania Skills Development Levy (SDL) calculator: work out the 3.5% employer levy on your monthly payroll. Fast and free, no sign-up.",
    intro:
      "Calculate the Skills Development Levy (SDL) you owe as an employer in Tanzania. Enter your total gross monthly payroll to see the 3.5% levy, which applies to employers with 10 or more employees.",
    howItWorks: {
      formula: "SDL = 3.5% × total gross monthly payroll (if 10+ employees)",
      explanation:
        "SDL is a compulsory employer levy that funds vocational skills development. It is charged at 3.5% of total gross monthly emoluments and only applies to employers with 10 or more employees.",
    },
    examples: [
      { title: "Example", text: "A 1,000,000 TZS monthly payroll with 10+ employees attracts 3.5% × 1,000,000 = 35,000 TZS in SDL." },
    ],
    faq: [
      { q: "What is the SDL rate in Tanzania?", a: "3.5% of total gross monthly emoluments paid to all employees." },
      { q: "Who pays SDL?", a: "The employer only — it is never deducted from employees' wages." },
      { q: "Does SDL apply to all employers?", a: "No. It applies only to employers with 10 or more employees." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "Tanzania Revenue Authority (TRA)", url: "https://www.tra.go.tz" }],
    related: ["tanzania-employer-cost-calculator", "tanzania-nssf-calculator", "tanzania-paye-calculator"],
  },
  {
    slug: "tanzania-wcf-calculator",
    name: "Tanzania WCF Calculator",
    category: "Finance",
    kind: "widget",
    metaDescription:
      "Free Tanzania Workers Compensation Fund (WCF) calculator: work out the 0.5% employer contribution on your monthly payroll. Fast, free, no sign-up.",
    intro:
      "Calculate your Workers Compensation Fund (WCF) contribution in Tanzania. Enter your total gross monthly payroll to see the 0.5% employer contribution that funds workplace injury protection.",
    howItWorks: {
      formula: "WCF = 0.5% × total gross monthly payroll",
      explanation:
        "The Workers Compensation Fund is a mandatory insurance scheme funded by employers at 0.5% of cash paid to employees. It covers workplace injuries and occupational diseases — the cost is employer-borne only.",
    },
    examples: [
      { title: "Example", text: "A 1,000,000 TZS monthly payroll attracts 0.5% × 1,000,000 = 5,000 TZS in WCF." },
    ],
    faq: [
      { q: "What is the WCF rate in Tanzania?", a: "0.5% of cash paid to employees, at a unified rate for all sectors." },
      { q: "Who pays WCF?", a: "The employer only — it is not deducted from employees' pay." },
      { q: "What does WCF cover?", a: "Compensation for workplace injuries and occupational diseases." },
    ],
    disclaimers: ["financial"],
    sources: [{ label: "Workers Compensation Fund (WCF)", url: "https://www.wcf.go.tz" }],
    related: ["tanzania-employer-cost-calculator", "tanzania-sdl-calculator", "tanzania-nssf-calculator"],
  },
];

export function getTool(slug: string): ToolContent | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
