import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { addCurrentDate } from '../tasks/TasksSlice';
import { showHideCalendar } from '../addTask/AddTaskSlice';

import './Calendar.sass'

const Calendar = () => {
    const daysName = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const week = useMemo(() => daysName.map((elem, i) =>  <li key={i}>{elem}</li>), [])

    const dispatch = useDispatch()

    const initialDate = useMemo(() => new Date(), []);
    const initialYear = initialDate.getFullYear();
    const initialMonth = initialDate.getMonth();
    const currentDay = initialDate.getDate();

    const [currentYear, setCurrentYear] = useState(initialYear);
    const [currentMonth, setCurrentMonth] = useState(initialMonth);

    useEffect(() => {
        dispatch(addCurrentDate({day: currentDay, month: months[initialMonth].toLowerCase()}))
    }, [])

    const getCurrentMonth = (i) => {
        setCurrentMonth((prevMonth) => {
            let newMonth = prevMonth + i;
            let newYear = currentYear;

            if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            } else if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            }

            setCurrentYear(newYear);
            return newMonth;
        });
    };

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Adjust if week starts on Monday
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

        const previousMonthDays = Array.from({ length: adjustedFirstDay }, (_, i) => lastDateOfLastMonth - adjustedFirstDay + i + 1);
        const currentMonthDays = Array.from({ length: lastDateOfMonth }, (_, i) => i + 1);
        const nextMonthDays = Array.from({ length: 6 - (lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1) }, (_, i) => i + 1);

        return (
            <>
                {previousMonthDays.map((day, i) => <li className='inactive' key={`prev-${i}`}>{day}</li>)}
                {currentMonthDays.map((day, i) => {
                    const isActive = currentYear === initialYear && currentMonth === initialMonth && day === currentDay;
                    return <li 
                        onClick={() => {
                            dispatch(addCurrentDate({day, month: months[currentMonth].toLowerCase()}))
                            dispatch(showHideCalendar())
                        }} 
                        key={`curr-${i}`}  
                        className={isActive ? 'active' : 'just-day'}>{day}</li>;                    
                })}
                {nextMonthDays.map((day, i) => <li className='inactive' key={`next-${i}`}>{day}</li>)}
            </>
        );
    };

    const days = useMemo(() => renderCalendar(), [currentMonth])

    return (
        <div className='calendar'>
            <div className='calendar__today'>
                {`${initialDate.getDate()} ${months[initialMonth].toLowerCase()}`}
            </div>
            <div className='calendar__data'>
                <span>{months[currentMonth]} {currentYear}</span>
                <div>
                    <FontAwesomeIcon onClick={() => getCurrentMonth(-1)}  icon={faArrowLeft} />
                    <FontAwesomeIcon onClick={() => getCurrentMonth(1)} icon={faArrowRight} />
                </div>
            </div>
            <ul className='calendar__week'>
                {week}
            </ul>
            <ul className='calendar__days'>
                {days}
            </ul>
        </div>
    )
}

export default Calendar;