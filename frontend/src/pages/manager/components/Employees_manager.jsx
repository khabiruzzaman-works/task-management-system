import { useWorker } from "../../../context/Worker.context";
import Loading_screen from "../../../components/pages/Loading_screen";

export default function Employees_manager() {
  const { worker, worker_loading, refresh_worker } = useWorker();
  if (worker_loading) {
    return <Loading_screen />;
  }

  return (
    <>
      {worker.map(function (wo) {
        return (
          <div key={wo?._id} className="w-full flex mb-3">
            <span className="text-primary text-sm">{wo?.name}</span>
          </div>
        );
      })}
    </>
  );
}
