import { http, HttpResponse } from "msw";
import data from "./mockData.json";

export const handlers = [
  http.get("/api/users", (resolver) => {
    return HttpResponse.json(data);
  }),
  http.post("/api/saveData", (resolver) => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
  http.post("/api/addCard", (resolver) => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
];
