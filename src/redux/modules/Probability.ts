import { Middleware } from "@reduxjs/toolkit";

export const probabilityMiddleware: Middleware = () => (next) => (action) => {
  const probability = action?.meta?.probability;

  if (probability == undefined || Math.random() <= probability) {
    return next(action);
  }
};
