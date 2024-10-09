"use client";
import { useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";

export default function MortgageCalculator() {
    const t = useTranslations('Main.Counter');
    // Line 15: Define state for property cost
    const [propertyCost, setPropertyCost] = useState<number>(0);

    // Line 16: Define state for down payment
    const [downPayment, setDownPayment] = useState<number>(0);

    // Line 17: Define state for loan term in years
    const [loanTerm, setLoanTerm] = useState<number>(0);

    // Line 22: Define state for interest rate
    const [interestRate, setInterestRate] = useState<number>(0);

    // Line 23: Define state for monthly payment
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);

    // Line 24: Define state for loan amount
    const [loanAmount, setLoanAmount] = useState<string | null>(null);

    // Line 25: Define state for final payment date
    const [finalDate, setFinalDate] = useState<string | null>(null);

    // Line 47: Define the calculateMortgage function
    const calculateMortgage = (): void => {
        // Ensure numerical calculations by parsing inputs
        const principal: number = propertyCost - downPayment;
        const monthlyRate: number = interestRate / 100 / 12;
        const numPayments: number = loanTerm * 12;

        // Avoid division by zero or negative interest rates
        if (monthlyRate === 0) {
            const payment = principal / numPayments;
            setMonthlyPayment(payment.toFixed(2));
        } else {
            const payment: number =
                (principal * monthlyRate) /
                (1 - Math.pow(1 + monthlyRate, -numPayments));
            setMonthlyPayment(payment.toFixed(2));
        }

        setLoanAmount(principal.toFixed(2));

        const finalPaymentDate = new Date();
        finalPaymentDate.setMonth(finalPaymentDate.getMonth() + numPayments);
        setFinalDate(
            finalPaymentDate.toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    };

    // Line 85: Define the handleInputChange function
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const { id, value } = e.target;
        const numericValue = parseFloat(value) || 0;

        switch (id) {
            case "propertyCost":
                setPropertyCost(numericValue);
                break;
            case "downPayment":
                setDownPayment(numericValue);
                break;
            case "loanTerm":
                setLoanTerm(numericValue);
                break;
            case "interestRate":
                setInterestRate(numericValue);
                break;
            default:
                break;
        }
    };

    return (
        <div className="px-[15px] max-w-[1440px] w-full mx-auto flex flex-col">
            <h2 className="font-medium text-[30px] md:text-[45px] mdx:text-[55px] mb-4">
                {t("title")}
            </h2>
            <div className="bg-white px-[20px] py-[25px] counter-shadow 2xl:p-[0px]">
                <div className="mdl:flex mdl:justify-between 2xl:p-[40px]">
                    <div className="mdl:w-[55%] max-mdl:pb-[30px] max-mdl:border-b 2xl:border-r mdx:pr-[20px] slg:pr-[40px] 2xl:pr-[70px] 3xl:pr-[100px] 2xl:grid 2xl:grid-cols-2 2xl:gap-[40px] 2xl:pb-0">
                        {/* Property Cost Input */}
                        <div className="mb-4">
                            <label
                                className="block text-[#858585] mb-2"
                                htmlFor="propertyCost"
                            >
                                {t("price")} (у.е.)
                            </label>
                            <input
                                id="propertyCost"
                                type="number"
                                value={propertyCost}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите стоимость"
                                min="0"
                            />
                        </div>

                        {/* Down Payment Input */}
                        <div className="mb-4">
                            <label
                                className="block text-[#858585] mb-2"
                                htmlFor="downPayment"
                            >
                                {t("one")} (у.е.)
                            </label>
                            <input
                                id="downPayment"
                                type="number"
                                value={downPayment}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите размер взноса"
                                min="0"
                                max={propertyCost}
                            />
                        </div>

                        {/* Loan Term Input */}
                        <div className="mb-4">
                            <label
                                className="block text-[#858585] mb-2"
                                htmlFor="loanTerm"
                            >
                                {t("two")}
                            </label>
                            <input
                                id="loanTerm"
                                type="number"
                                value={loanTerm}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите срок"
                                min="1"
                            />
                        </div>

                        {/* Interest Rate Input */}
                        <div className="mb-6">
                            <label
                                className="block text-[#858585] mb-2"
                                htmlFor="interestRate"
                            >
                                {t("three")} (%)
                            </label>
                            <input
                                id="interestRate"
                                type="number"
                                value={interestRate}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите размер ставки"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={calculateMortgage}
                            className="bg-[#E1AF93] hover:bg-[#EAC7B4] text-[#fff] py-[12px] focus:outline-none focus:shadow-outline text-[17px]  w-[223px] font-semibold"
                            type="button"
                        >
                            {t("four")}
                        </button>
                    </div>

                    {/* Results Section */}
                    {monthlyPayment !== null && (
                        <div className="mt-6 text-left p-[15px] mdl:w-[45%] mdl:mt-0 2xl:flex 2xl:flex-wrap 2xl:justify-between 2xl:ml-[30px] 3xl:ml-[50px] 2xl:p-0 max-mdl:gap-[16px] max-2xl:gap-[40px] max-2xl:flex max-2xl:flex-col">
                            {/* Monthly Payment */}
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("five")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {monthlyPayment} у.е.
                                </p>
                            </div>

                            {/* Loan Amount */}
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("six")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {loanAmount} у.е.
                                </p>
                            </div>

                            {/* Interest Rate */}
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("seven")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {interestRate}%
                                </p>
                            </div>

                            {/* Final Payment Date */}
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("eight")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {finalDate}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
