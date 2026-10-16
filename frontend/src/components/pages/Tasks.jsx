import { useAuth } from "../../context/Auth.context";
import { useTaskCenter } from "../../context/Task.context";
import Task_view_card from "../Task_view_card";
import Loading_screen from "./Loading_screen";

export default function Tasks() {
  const { user, user_loading } = useAuth();
  const { tasks, task_loading } = useTaskCenter();
  if (user_loading || task_loading) {
    return <Loading_screen />;
  }
  return (
    <>
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
                  edit_path={`/${user?.role}/task/edit/${task._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
