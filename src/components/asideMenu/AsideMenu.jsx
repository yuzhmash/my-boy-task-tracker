import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { createNewTask } from "../addTask/AddTaskSlice";
import logo from "../pages/logo.svg"

import "./AsideMenu.sass"

const AsideMenu = () => {
    const dispatch = useDispatch()
    return (
        <aside className="menu">
            <div>
                <div className="logo logo_menu">
                    <img src={logo} alt="logo_img"/><div>MYBOY</div>
                </div>
                <button className="menu__btn" onClick={() => dispatch(createNewTask())}> 
                    <FontAwesomeIcon icon={faCirclePlus}/> <div>add ur fucking task</div></button>
            </div>
        </aside>
    )
}

export default AsideMenu;