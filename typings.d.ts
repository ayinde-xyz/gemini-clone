import { GenerateContentResult } from "@google/generative-ai";

interface Message {
  text: string;
  createdAt: admin.firestore.Timestamp;
  role: "user" | "model";
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface MessageHistory {
  content: [{ text: string }];
  role: "user" | "model";
}
