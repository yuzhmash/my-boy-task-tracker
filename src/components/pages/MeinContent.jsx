import AsideMenu from "../asideMenu/AsideMenu";
import AddTask from "../addTask/AddTask";
import Tasks from "../tasks/Tasks";

const MeinContent = () => {
    return (
        <>
            <div className="main__wrapper">
                <AsideMenu/>
                <Tasks/>
            </div>
            <AddTask/>
        </>
    )
}

export default MeinContent;