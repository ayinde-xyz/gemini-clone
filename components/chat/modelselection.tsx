"use client";
import React from "react";
import useSWR from "swr";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { ChatSchemaType } from "@/schemas";

type Model = {
  field: ControllerRenderProps<ChatSchemaType, "model">;
};

// const fetchModels =  ({field}) =>
//   fetch("/api/getModels").then((res) => res.json());

const ModelSelection = ({ field }: Model) => {
  //   const { data: models, isLoading } = useSWR("models", fetchModels);
  //   const { data: model, mutate: setModel } = useSWR("model", {
  //     fallbackData: "text-davinci-003",
  //   });

  return (
    <Select onValueChange={field?.onChange} defaultValue={field?.value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a model</SelectLabel>
          <SelectItem value="0">Gemini 15 Pro</SelectItem>
          <SelectItem value="1">Gemini 1.5 Flash</SelectItem>
          <SelectItem value="2">Gemini 1.5 Flash-8b</SelectItem>
          <SelectItem value="3">Gemini 2.0 Flash-Experimental</SelectItem>
          <SelectItem value="4">Gemini Experimental 1206</SelectItem>
          {/* <SelectItem value="5">
            Gemini 2.0 Flash Thinking Experimental
          </SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelection;

// {!isLoading ? (
//   models.modelOptions.map((model: any) => (
//     <SelectItem value={model.value}>{model.label}</SelectItem>
//   ))
// ) : (
//   <SelectItem value={" "}>Loading...</SelectItem>
// )}
