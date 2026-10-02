export default async function assign_worker_service(
  worker_email,
  manager_email,
  access_token,
) {
  const response = await fetch(
    "http://localhost:3000/api/user/admin/assign-worker",
    {
      method: "PATCH",
      body: JSON.stringify({ worker_email, manager_email }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return await response.json();
}
