import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import { addTask, loadingTask, errorTask } from "../tasks/TasksSlice";
import { cancleNewTask } from "./AddTaskSlice";

import "./AddTask.sass"

const AddTask = () => {

    const doNeedAddTask = useSelector(state => state.task.newTask)
    console.log(doNeedAddTask);

    const dispatch = useDispatch()

    const createNewTask = values => {
        dispatch(addTask(values))
        dispatch(cancleNewTask())
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            desc: ""
        },
        onSubmit: (values, {resetForm}) => {
            createNewTask(values)
            resetForm()
        }
    })


    return (
        <>
            {doNeedAddTask ?  <View dispatch={dispatch} formik={formik} /> : null}
        </>
    )
}

const View = ({dispatch, formik}) => {
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
                <button type="button" className="modal__btn"><FontAwesomeIcon icon={faCalendarDays} /><span>today</span></button>
                <div className="modal__btns">
                    <button type="button" onClick={() => {dispatch(cancleNewTask()), formik.resetForm()}} >cancel</button>
                    <button type="submit" >add</button>
                </div>
        </form>
    )
}

export default AddTask;