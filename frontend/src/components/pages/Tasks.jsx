import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";
import { useTaskCenter } from "../../context/Task.context";
import Buttons from "../buttons/buttons";
import Task_view_card from "../Task_view_card";
import Loading_screen from "./Loading_screen";

export default function Tasks() {
  const { user, user_loading } = useAuth();
  const { tasks, task_loading } = useTaskCenter();
  const navigate = useNavigate();
  if (user_loading || task_loading) {
    return <Loading_screen />;
  }
  return (
    <>
      {user?.role === "admin" && (
        <div className="flex justify-end border-b py-2">
          <Buttons
            text={"Create task"}
            onClick={function () {
              navigate("/admin/tasks/create");
            }}
          />
        </div>
      )}
      <div>
        {tasks.length === 0 && (
          <div className="empty">
            <p className="empty-mark">[ ]</p>
            <p className="empty-title">No tasks yet.</p>
            <p className="muted">No Task</p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="flex flex-col gap-3">
            {tasks.map(function (task) {
              return (
                <Task_view_card
                  key={task._id}
                  task={task}
                  edit_path={`/${user?.role}/tasks/edit/${task._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
