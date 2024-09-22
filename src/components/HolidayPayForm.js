import axios from 'axios';
import { useState } from "react";

function GeneratorForm() {
    const [averageSalary, setAverageSalary] = useState("");
    const [holidayStartDate, setHolidayStartDate] = useState("");
    const [holidayEndDate, setHolidayEndDate] = useState("");
    const [isThereFiveWorkingDays, setIsThereFiveWorkingDays] = useState(false);

    const [holidayPay, setHolidayPay] = useState(null);

    const save = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get("http://localhost:8080/api/holiday_pay_calculator/calculate?holidayDaysNumber=0&averageSalary="
                + averageSalary + "&holidayStartDate=" + holidayStartDate + "&holidayEndDate="
                + holidayEndDate + "&isThereFiveWorkingDays=" + isThereFiveWorkingDays);
            setHolidayPay(response.data.vacationPay);
        } catch (err) {
            alert("В ходе расчета возникла ошибка.");
            setHolidayPay(null);
        }
    };

    const handleAverageSalaryChange = (event) => {
        setAverageSalary(event.target.value);
    };
    const handleHolidayStartDateChange = (event) => {
        setHolidayStartDate(event.target.value);
    };
    const handleHolidayEndDateChange = (event) => {
        setHolidayEndDate(event.target.value);
    };



    return (
        <div>
            <form onSubmit={save}>
                <div class="form">

                    <div class="title">Калькулятор отпускных</div>

                    <div class="subtitle">Данный калькулятор принимает среднюю зарплату за 12 месяцев и точные дни ухода в отпуск (в формате дд.мм.гггг),
                        а затем отвечает суммой отпускных, которые придут сотруднику</div>
                    <div class="subtitle">Расчет отпускных происходит с учётом выходных</div>

                    <div class="input-container ic1">
                        <input
                            class="input"
                            id="averageSalary"
                            required
                            type="number"
                            value={averageSalary}
                            onChange={handleAverageSalaryChange}
                            placeholder=" "
                        />
                        <div class="cut"></div>
                        <label for="averageSalary" class="placeholder">Средняя ЗП за 12 месяцев</label>
                    </div>

                    <div class="input-container ic2">
                        <input
                            class="input"
                            id="holidayStartDate"
                            required
                            type="text"
                            value={holidayStartDate}
                            onChange={handleHolidayStartDateChange}
                            placeholder=" "
                        />
                        <div class="cut cut2"></div>
                        <label for="holidayStartDate" class="placeholder">День начала отпуска</label>
                    </div>

                    <div class="input-container ic2">
                        <input
                            class="input"
                            id="holidayEndDate"
                            required
                            type="text"
                            value={holidayEndDate}
                            onChange={handleHolidayEndDateChange}
                            placeholder=" "
                        />
                        <div class="cut cut3"></div>
                        <label for="holidayEndDate" class="placeholder">День конца отпуска</label>
                    </div>

                    <div class="input-container ic2">
                        <label class="container">Пятидневная рабочая неделя?
                            <input
                                type="checkbox"
                                onChange={(e) => setIsThereFiveWorkingDays(e.target.checked)}
                            />
                            <span class="checkmark"></span>
                        </label>
                    </div>


                    <button type="submit" class="submit">Рассчитать отпускные</button>

                    {holidayPay !== null && (
                        <div>
                            <div class="title">Результат расчета</div>
                            <div class="subtitle">Отпускные: {holidayPay}</div>
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
}

export default GeneratorForm;