const PRIORITY_STYLES = {
  High: { tag: "tag-vintage tag-advanced", marker: "[!]" },
  Medium: { tag: "tag-vintage tag-intermediate", marker: "" },
  Low: { tag: "tag-vintage", marker: "" },
};

export default function Task_card_as_admin({
  priority = "High",
  logger_name = "Logger's name",
  title = "title",
  description = "Description",
  deadline_date = "20th sep",
  is_overdue = false,
}) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low;

  return (
    <>
      <article className="card-vintage-hover flex flex-col gap-3 min-h-44">
        <div className="flex justify-between items-center gap-3">
          <span className={style.tag}>
            {style.marker && <span className="text-mark mr-1.5">{style.marker}</span>}
            {priority}
          </span>
          <span className="text-caption-md leading-normal text-fade truncate">{logger_name}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-heading-md font-bold text-parchment truncate">{title}</h3>
          <p className="text-caption-md leading-normal text-prose line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center border-t border-hairline pt-2 text-caption-md leading-normal">
          <span className="text-fade">Due</span>
          <span className={is_overdue ? "text-alert" : "text-chalk"}>
            {is_overdue && <span className="mr-1.5">[!]</span>}
            {deadline_date}
          </span>
        </div>
      </article>
    </>
  );
}
