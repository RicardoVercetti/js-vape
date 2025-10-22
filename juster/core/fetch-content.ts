import axios, { type AxiosResponse } from "axios";
import https from "https";

export async function getContent(site: string): Promise<AxiosResponse> {
    const response = await axios.get(site, {
        headers: { "User-Agent": "Mozilla/5.0" },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

    return response;
}

export async function postContent(site: string, body: string): Promise<AxiosResponse> {
  const response = await axios.post(site, body, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Content-Type": "application/json",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  return response;
}