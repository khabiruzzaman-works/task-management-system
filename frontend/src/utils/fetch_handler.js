let BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
let access_token = null;
let refreshed_promise = null;
let session_dead = null;
let session_refreshed = null;
export function set_fetch_access_token(token) {
  access_token = token;
}

export function config_access({ session_cut, session_loaded }) {
  session_dead = session_cut;
  session_refreshed = session_loaded;
}

export async function refresh_token() {
  if (!refreshed_promise) {
    refreshed_promise = (async function () {
      const response = await fetch(
        `${BASE_URL}/authentication/refresh-tokens`,
        {
          credentials: "include",
        },
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      return result.data;
    })().finally(function () {
      refreshed_promise = null;
    });
  }
  return refreshed_promise;
}

async function send_req(path, options) {
  let response = await fetch(`${BASE_URL}/${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  return { response, result };
}

export default async function fetch_handler(path, options = {}) {
  let { response, result } = await send_req(path, options);

  if (response.status === 401 && result.code === "TOKEN_EXPIRED") {
    try {
      const data = await refresh_token();
      access_token = data.accessToken;
      session_refreshed?.(data.accessToken, data.user);
    } catch {
      session_dead?.();

      throw new Error("session is dead,please log in");
    }
    ({ response, result } = await send_req(path, options));
  }
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}
