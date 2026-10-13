// Display only: back button and title block at the top of every form page.

export default function Form_head({ eyebrow, title, description, on_back }) {
  return (
    <>
      <div className="form-back">
        <button type="button" className="btn btn-sm btn-ghost" onClick={on_back}>
          [&lt;] back
        </button>
      </div>
      <header className="form-head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </header>
    </>
  );
}
