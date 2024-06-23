import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import { addTask, loadingTask, errorTask } from "../tasks/TasksSlice";
import { cancleNewTask, showHideCalendar} from "./AddTaskSlice";
import Calendar from "../calendar/Calendar";
import { addCurrentDate } from "../tasks/TasksSlice";

import "./AddTask.sass"

const AddTask = () => {

    const doNeedAddTask = useSelector(state => state.task.newTask)
    const showCalendar = useSelector(state => state.task.calendarStatus)
    const date = useSelector(state => state.tasks.currentdate)
    const data = useSelector(state => state.tasks.data)

    const dispatch = useDispatch()

    const createNewTask = values => {
        dispatch(addTask(values))
        dispatch(cancleNewTask())
    }

    useEffect(() => {
        showCalendar 
            ? document.body.style.pointerEvents = 'none'
            : document.body.style.pointerEvents = 'auto'

        return () => document.body.style.pointerEvents = 'auto';
    }, [showCalendar]);

    const formik = useFormik({
        initialValues: {
            title: "",
            desc: ""
        },
        onSubmit: (values, {resetForm}) => {
            createNewTask({...values, ...date})
            resetForm()
        }
    })


    return (
        <>
            {doNeedAddTask ?  <View dispatch={dispatch} formik={formik} data={data}/> : null}
            {showCalendar ? <Calendar/> : null}
        </>
    )
}

const View = ({dispatch, formik, data}) => {
    return (
        <form className="modal" onSubmit={formik.handleSubmit}>
                <input
                    id="title"
                    name="title"
                    className="modal__input" 
                    type="text" 
                    placeholder="Name of ur fckin task"
                    value={formik.values.title}
                    onChange={formik.handleChange} />
                <textarea 
                    id="desc"
                    name="desc"
                    className="modal__input modal__input_small" 
                    type="text" 
                    placeholder="what wanna remind u?"
                    value={formik.values.desc}
                    onChange={formik.handleChange} />
                <button 
                    onClick={() => dispatch(showHideCalendar())}
                    type="button" 
                    className="modal__btn">
                        <FontAwesomeIcon icon={faCalendarDays} /><span>today</span></button>
                <div className="modal__btns">
                    <button type="button" onClick={() => {dispatch(cancleNewTask()), formik.resetForm()}} >cancel</button>
                    <button type="submit" >add</button>
                </div>
        </form>
    )
}

export default AddTask;