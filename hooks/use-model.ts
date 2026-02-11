"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatSchemaType } from "@/schemas";

type ModelState = {
  model: ChatSchemaType["model"];
  setModel: (model: ChatSchemaType["model"]) => void;
  reset: () => void;
};

const DEFAULT_MODEL = "gemini-2.5-flash";

const useModel = create<ModelState>()(
  persist(
    (set) => ({
      model: DEFAULT_MODEL,
      setModel: (model) => set({ model }),
      reset: () => set({ model: DEFAULT_MODEL }),
    }),
    {
      name: "neuralis-model-storage", // key in localStorage (optional)
      getStorage: () =>
        typeof window !== "undefined" ? localStorage : undefined,
    },
  ),
);

export default useModel;
