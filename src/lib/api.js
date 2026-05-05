import ky from "ky";

let getToken = async () => null;

export function setTokenProvider(provider) {
  getToken = provider ?? (async () => null);
}

export function setToken(token) {
  getToken = async () => token;
}

const api = ky.create({
  prefix: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        let token = null;

        try {
          token = await getToken();
        } catch {
          token = null;
        }
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export default api;
