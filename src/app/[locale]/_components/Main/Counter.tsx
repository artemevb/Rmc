"use client";
import { useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";

export default function MortgageCalculator() {
    const t = useTranslations('Main.Counter');
    const [propertyCost, setPropertyCost] = useState<number | string>(""); // Updated default state to an empty string
    const [downPayment, setDownPayment] = useState<number | string>(""); // Updated default state to an empty string
    const [loanTerm, setLoanTerm] = useState<number | string>(""); // Updated default state to an empty string
    const [interestRate, setInterestRate] = useState<number | string>(""); // Updated default state to an empty string
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
    const [loanAmount, setLoanAmount] = useState<string | null>(null);
    const [finalDate, setFinalDate] = useState<string | null>(null);

    // Проверка, что все поля заполнены
    const isButtonDisabled = !propertyCost || !downPayment || !loanTerm || !interestRate;

    const calculateMortgage = (): void => {
        const principal: number = parseFloat(propertyCost as string) - parseFloat(downPayment as string);
        const monthlyRate: number = parseFloat(interestRate as string) / 100 / 12;
        const numPayments: number = parseFloat(loanTerm as string) * 12;

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
        const totalMonths = numPayments;
        const finalYear = finalPaymentDate.getFullYear() + Math.floor(totalMonths / 12);
        const finalMonth = finalPaymentDate.getMonth() + (totalMonths % 12);

        if (finalMonth > 11) {
            finalPaymentDate.setFullYear(finalYear + 1);
            finalPaymentDate.setMonth(finalMonth - 12);
        } else {
            finalPaymentDate.setFullYear(finalYear);
            finalPaymentDate.setMonth(finalMonth);
        }

        setFinalDate(
            finalPaymentDate.toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const { id, value } = e.target;

        switch (id) {
            case "propertyCost":
                setPropertyCost(value);
                break;
            case "downPayment":
                setDownPayment(value);
                break;
            case "loanTerm":
                setLoanTerm(value);
                break;
            case "interestRate":
                setInterestRate(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="max-2xl:px-[15px] max-w-[1440px] w-full mx-auto flex flex-col">
            <h2 className="font-medium text-[30px] md:text-[45px] mdx:text-[55px] mb-4">
                {t("title")}
            </h2>
            <div className="bg-white px-[20px] py-[25px] counter-shadow 2xl:p-[0px]">
                <div className="mdl:flex mdl:justify-between 2xl:p-[40px]">
                    <div className="mdl:w-[55%] max-mdl:pb-[30px] max-mdl:border-b 2xl:border-r mdx:pr-[20px] slg:pr-[40px] 2xl:pr-[70px] 3xl:pr-[100px] 2xl:grid 2xl:grid-cols-2 2xl:gap-[40px] 2xl:pb-0">
                        {/* Поле стоимости недвижимости */}
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="propertyCost">
                                {t("price")} (у.е.)
                            </label>
                            <input
                                id="propertyCost"
                                type="number"
                                value={propertyCost}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder={t("enter_cost")}
                                min="0"
                            />
                        </div>

                        {/* Поле первоначального взноса */}
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="downPayment">
                                {t("one")} (у.е.)
                            </label>
                            <input
                                id="downPayment"
                                type="number"
                                value={downPayment}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder={t("enter_down_payment")}
                                min="0"
                                max={parseFloat(propertyCost as string) || 0}
                            />
                        </div>

                        {/* Поле срока кредита */}
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="loanTerm">
                                {t("two")}
                            </label>
                            <input
                                id="loanTerm"
                                type="number"
                                value={loanTerm}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder={t("enter_term")}
                                min="1"
                            />
                        </div>

                        {/* Поле процентной ставки */}
                        <div className="mb-6">
                            <label className="block text-[#858585] mb-2" htmlFor="interestRate">
                                {t("three")} (%)
                            </label>
                            <input
                                id="interestRate"
                                type="number"
                                value={interestRate}
                                onChange={handleInputChange}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder={t("enter_rate")}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Кнопка расчета */}
                        <button
                            onClick={calculateMortgage}
                            className="bg-corporate hover:bg-[#EAC7B4] text-[#fff] py-[12px] focus:outline-none focus:shadow-outline text-[17px] w-[223px] font-semibold"
                            type="button"
                            disabled={isButtonDisabled} // Устанавливаем атрибут disabled
                        >
                            {t("four")}
                        </button>
                    </div>

                    {/* Результаты */}
                    {monthlyPayment !== null && (
                        <div className="mt-6 text-left p-[15px] mdl:w-[45%] mdl:mt-0 2xl:flex 2xl:flex-wrap 2xl:justify-between 2xl:ml-[30px] 3xl:ml-[50px] 2xl:p-0 max-mdl:gap-[16px] max-2xl:gap-[40px] max-2xl:flex max-2xl:flex-col">
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("five")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {monthlyPayment} у.е.
                                </p>
                            </div>

                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("six")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {loanAmount} у.е.
                                </p>
                            </div>

                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">
                                    {t("seven")}
                                </p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">
                                    {interestRate}%
                                </p>
                            </div>

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
