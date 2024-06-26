import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import './TasksItems.sass'

const TasksItems = () => {
    const data = useSelector(state => state.tasks.data)
    const tasks = data.map(({title, desc, day, month}, i) => {
        if (!title) {
            return null
        }
        console.log(day);
        return (
            <li key={i}>
                <input type="radio" />
                <div className='tasks__wrapepr'>
                    <div className='tasks__title'>{title}</div>
                    <div className='tasks__desc'>{desc}</div>
                    <div className='tasks__data'>
                    <FontAwesomeIcon icon={faCalendarDays} />{day} {month}</div>
                </div>
            </li>
        )
    })

    return (
        <ul>
            {tasks}
        </ul>
    )
}

export default TasksItems;