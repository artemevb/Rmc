"use client"
import { useState } from "react";

export default function MortgageCalculator() {
    const [propertyCost, setPropertyCost] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanAmount, setLoanAmount] = useState(null);
    const [finalDate, setFinalDate] = useState(null);


    const calculateMortgage = () => {
        const principal = propertyCost - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;
        const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
        const finalPaymentDate = new Date();
        finalPaymentDate.setMonth(finalPaymentDate.getMonth() + numPayments);

        setMonthlyPayment(monthlyPayment.toFixed(2));
        setLoanAmount(principal.toFixed(2));
        setFinalDate(finalPaymentDate.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }));
    };

    return (
        <div className="px-[15px] max-w-[1440px] w-full mx-auto flex flex-col">
            <h2 className="font-bold text-[27px] md:text-[35px] mdx:text-[40px] mb-4">
                Рассчитайте ипотеку
            </h2>
            <div className="bg-white px-[20px] py-[25px] counter-shadow 2xl:p-[0px]">
                <div className=" mdl:flex mdl:justify-between 2xl:p-[40px]">
                    <div className="mdl:w-[55%] max-mdl:pb-[30px] max-mdl:border-b 2xl:border-r mdx:pr-[20px] slg:pr-[40px] 2xl:pr-[70px] 3xl:pr-[100px] 2xl:grid 2xl:grid-cols-2 2xl:gap-[40px] 2xl:pb-0">
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="propertyCost">
                                Стоимость недвижимости (у.е.)
                            </label>
                            <input
                                id="propertyCost"
                                type="number"
                                value={propertyCost}
                                onChange={(e) => setPropertyCost(e.target.value)}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите стоимость"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    if (/-/.test(value)) {
                                        e.target.value = value.replace(/-/g, '');
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="downPayment">
                                Первоначальный взнос (у.е.)
                            </label>
                            <input
                                id="downPayment"
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(e.target.value)}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите размер взноса"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    if (/-/.test(value)) {
                                        e.target.value = value.replace(/-/g, '');
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#858585] mb-2" htmlFor="loanTerm">
                                Срок в годах
                            </label>
                            <input
                                id="loanTerm"
                                type="number"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите срок"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    if (/-/.test(value)) {
                                        e.target.value = value.replace(/-/g, '');
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-[#858585] mb-2" htmlFor="interestRate">
                                Ставка (%)
                            </label>
                            <input
                                id="interestRate"
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                className="appearance-none border w-full py-3 px-3 mdx:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-spinner"
                                placeholder="Введите размер ставки"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    if (/-/.test(value)) {
                                        e.target.value = value.replace(/-/g, '');
                                    }
                                }}
                            />
                        </div>
                        <button
                            onClick={calculateMortgage}
                            className="bg-[#E1AF93] hover:bg-[#EAC7B4] text-[#fff] py-[12px] focus:outline-none focus:shadow-outline text-[17px]  w-[223px] font-semibold"
                            type="button"
                        >
                            Рассчитать
                        </button>
                    </div>

                    {monthlyPayment !== null && (
                        <div className="mt-6 text-left p-[15px] mdl:w-[45%] mdl:mt-0 2xl:flex 2xl:flex-wrap 2xl:justify-between 2xl:ml-[30px] 3xl:ml-[50px] 2xl:p-0 max-mdl:gap-[16px] max-2xl:gap-[40px] max-2xl:flex max-2xl:flex-col">
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">Ежемесячный платеж</p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">{monthlyPayment} у.е.</p>

                            </div>
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">Сумма кредита</p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">{loanAmount} у.е.</p>

                            </div>
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">Процентная ставка</p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">{interestRate}%</p>

                            </div>
                            <div className="2xl:w-[48%]">
                                <p className="text-[16px] mdx:text-[18px] text-[#989898]">Дата последнего платежа</p>
                                <p className="text-[22px] font-medium mdx:text-[25px] text-[#151515]">{finalDate}</p>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
