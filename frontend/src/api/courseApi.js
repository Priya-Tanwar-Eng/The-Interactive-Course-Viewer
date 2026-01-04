import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL
});

const USER_ID = "user123";

export const getCourse = () =>
  API.get(`/course?userId=${USER_ID}`);

export const completeLesson = (lessonId) =>
  API.post("/complete", {
    userId: USER_ID,
    lessonId,
  });
