// fake data for judging the UI - delete once the task API exists
// status: "todo" | "in_progress" | "done"
export const DUMMY_TASKS = [
  { id: 1, priority: "High", logger_name: "Rafi", title: "Fix login bug", description: "Cookie is not set after admin login on Safari, so the user gets logged out on refresh.", deadline_date: "20th sep", is_overdue: false, status: "in_progress" },
  { id: 2, priority: "Medium", logger_name: "Nusrat", title: "Blog filters", description: "Add a tag filter to the blog page.", deadline_date: "24th sep", is_overdue: false, status: "todo" },
  { id: 3, priority: "Low", logger_name: "Tanvir", title: "Footer links", description: "Update social links.", deadline_date: "30th sep", is_overdue: false, status: "done" },
  { id: 4, priority: "High", logger_name: "Rafi", title: "A really long task title that overflows", description: "Checking how a long title gets truncated.", deadline_date: "18th sep", is_overdue: true, status: "todo" },
  { id: 5, priority: "Medium", logger_name: "Mahi", title: "Guide page", description: "Write the empty state for the guide page.", deadline_date: "27th sep", is_overdue: false, status: "in_progress" },
  { id: 6, priority: "Low", logger_name: "Rafi", title: "Compress hero images", description: "Convert the landing page images to webp.", deadline_date: "2nd oct", is_overdue: false, status: "todo" },
  { id: 7, priority: "High", logger_name: "Nusrat", title: "Payment webhook", description: "Verify the signature before updating the order.", deadline_date: "16th sep", is_overdue: true, status: "in_progress" },
  { id: 8, priority: "Medium", logger_name: "Rafi", title: "Write API docs", description: "Document the auth endpoints with example requests.", deadline_date: "5th oct", is_overdue: false, status: "done" },
];

export const STATUS_LABEL = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};
