import { useAuth } from "../../context/Auth.context";
import { useTaskCenter } from "../../context/Task.context";
import Stat from "../Stat";
import Loading_screen from "./Loading_screen";

export default function Dashboard({ }) {
  const { user, user_loading } = useAuth();
  const { tasks, task_loading } = useTaskCenter();

  if (task_loading || user_loading) {
    return <Loading_screen />;
  }
  function count(status) {
    return tasks.filter((t) => t.status === status).length;
  }
  return (
    <>
      <div className="w-full flex justify-evenly my-3.5">
        <Stat label="Total" counter={tasks.length} caption="all tasks" />
        <Stat
          label="Pending"
          counter={count("pending")}
          caption="not started"
        />
        <Stat
          label="In progress"
          counter={count("in_progress")}
          caption="being worked on"
          style="info"
        />
        <Stat
          label="Submitted"
          counter={count("submitted")}
          caption="waiting for approval"
          style="warn"
        />
        <Stat
          label="Approved"
          counter={count("approved")}
          caption="finished"
          style="clear"
        />
        <Stat
          label="Rejected"
          counter={count("rejected")}
          caption="sent back"
          style="alert"
        />
        <Stat
          label="Canceled"
          counter={count("canceled")}
          caption="called off"
        />
      </div>
    </>
  );
}
