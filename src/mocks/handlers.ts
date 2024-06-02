import { http, HttpResponse } from "msw";
import data from "./mockData.json";

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(data);
  }),
  http.post("/api/saveData", () => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
  http.post("/api/addCard", () => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
];
