import Task_card_as_admin from "../components/Task_card_as_admin.jsx";

// placeholder data so the UI can be judged - delete when the real logic is in
const DUMMY_TASKS = [
  {
    id: 1,
    priority: "High",
    logger_name: "Rafi",
    title: "Fix login bug",
    description: "Cookie is not set after admin login on Safari, so the user gets logged out on refresh.",
    deadline_date: "20th sep",
    is_overdue: false,
  },
  {
    id: 2,
    priority: "Medium",
    logger_name: "Nusrat",
    title: "Blog filters",
    description: "Add a tag filter to the blog page.",
    deadline_date: "24th sep",
    is_overdue: false,
  },
  {
    id: 3,
    priority: "Low",
    logger_name: "Tanvir",
    title: "Footer links",
    description: "Update social links.",
    deadline_date: "30th sep",
    is_overdue: false,
  },
  {
    id: 4,
    priority: "High",
    logger_name: "Rafi",
    title: "A really long task title that overflows",
    description: "Checking how a long title gets truncated.",
    deadline_date: "18th sep",
    is_overdue: true,
  },
  {
    id: 5,
    priority: "Medium",
    logger_name: "Mahi",
    title: "Guide page",
    description: "Write the empty state for the guide page.",
    deadline_date: "27th sep",
    is_overdue: false,
  },
];

export default function Admin() {
  return (
    <>
      <main className="min-h-screen w-full bg-canvas">
        <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-title-lg font-bold text-parchment">Task manager</h1>
            <div className="flex flex-col items-end">
              <span className="text-body-md leading-normal text-chalk">Full name</span>
              <span className="text-caption-md leading-normal text-fade">username</span>
            </div>
          </div>

          <hr className="hr-hairline" />

          <div className="flex flex-wrap items-center gap-2 my-6">
            <input
              type="text"
              placeholder="Search tasks"
              className="input-vintage text-caption-md leading-normal py-1 max-w-xs mr-2"
            />
            <button className="btn btn-sm btn-default">All</button>
            <button className="btn btn-sm btn-ghost">High</button>
            <button className="btn btn-sm btn-ghost">Medium</button>
            <button className="btn btn-sm btn-ghost">Low</button>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
            {DUMMY_TASKS.map((task) => (
              <Task_card_as_admin
                key={task.id}
                priority={task.priority}
                logger_name={task.logger_name}
                title={task.title}
                description={task.description}
                deadline_date={task.deadline_date}
                is_overdue={task.is_overdue}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
