import axios from "axios";
import { z } from "zod";

const backendApi = axios.create({
  baseURL: process.env.BACKENDAPI_BASEURL,
  headers: { Authorization: `Bearer ${process.env.BACKENDAPI_APIKEY}` },
});

export const getRoute = async <T>(path: string, schema: z.ZodType<T>) => {
  try {
    const axiosData = await backendApi.get(path);

    const parsedData = schema.safeParse(axiosData.data.data);
    if (!parsedData.success) throw parsedData.error;

    return parsedData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
