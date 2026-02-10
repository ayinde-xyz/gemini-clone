"use client";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { ChatSchemaType } from "@/schemas";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { BotIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Model = {
  field: ControllerRenderProps<ChatSchemaType, "model">;
  fieldState: ControllerFieldState;
  isSidebar: boolean;
};

const models = [
  {
    title: "Gemini 3 Pro",
    value: "gemini-3-pro-preview",
    description: "The best model in the world for multimodal understanding",
  },
  {
    title: "Gemini 3 Flash",
    value: "gemini-3-flash-preview",
    description:
      "Our most balanced model built for speed, scale, and frontier intelligence.",
  },
  {
    title: "Gemini 2.5 Flash",
    value: "gemini-2.5-flash",
    description:
      "Our best model in terms of price-performance, offering well-rounded capabilities",
  },
  {
    title: "Gemini 2.5 Flash-Lite",
    value: "gemini-2.5-flash-lite",
    description:
      "Our fastest flash model optimized for cost-efficiency and high throughput.",
  },
  {
    title: "Gemini 2.5 Pro",
    value: "gemini-2.5-pro",
    description:
      "Our state-of-the-art thinking model, capable of reasoning over complex problems ",
  },
];

const ModelSelection = ({ field, fieldState, isSidebar }: Model) => {
  if (isSidebar) {
    return (
      <Field>
        <FieldContent>
          <FieldLabel>Select a Model</FieldLabel>
        </FieldContent>
        <Select
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}>
          <SelectTrigger aria-invalid={fieldState.invalid} className="min-w-30">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="auto">Auto</SelectItem>
            <SelectSeparator />
            {models.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="icon" variant={"ghost"}>
          {/* {field.value
            ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
            : "Select a model"} */}
          <BotIcon size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-0  right-0 w-60 md:w-70  bg-slate-100">
        <DropdownMenuLabel>Select a model</DropdownMenuLabel>
        {/* <FieldSet> */}
        <RadioGroup
          {...field}
          value={field.value}
          // className="flex flex-col space-y-1"
          onValueChange={field.onChange}
          defaultValue="0">
          {models.map((model) => (
            <FieldLabel>
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldTitle>{model.title}</FieldTitle>
                  <FieldDescription>{model.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={model.value} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {/* </FieldSet> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelection;
