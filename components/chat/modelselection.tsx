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
  FieldSet,
  FieldTitle,
} from "../ui/field";

type Model = {
  field: ControllerRenderProps<ChatSchemaType, "model">;
  fieldState: ControllerFieldState;
};

const ModelSelection = ({ field, fieldState }: Model) => {
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
      <DropdownMenuContent className="absolute top-0 w-60 md:w-70 left-40 bg-slate-100">
        <DropdownMenuLabel>Select a model</DropdownMenuLabel>
        {/* <FieldSet> */}
        <RadioGroup
          {...field}
          value={field.value}
          // className="flex flex-col space-y-1"
          onValueChange={field.onChange}
          defaultValue="0">
          <FieldLabel>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Gemini 1.0 Pro</FieldTitle>
                <FieldDescription>Doesnt support file input</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="Gemini 1.0 Pro" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Gemini 1.5 Pro</FieldTitle>
                <FieldDescription>Supports file input</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="Gemini 1.5 Pro" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Gemini 1.5 Flash</FieldTitle>
                <FieldDescription>Fast and efficient</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="Gemini 1.5 Flash" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Gemini 1.5 Flash-8b</FieldTitle>
                <FieldDescription>
                  Smaller model with less memory usage
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="Gemini 1.5 Flash-8b" />
            </Field>
          </FieldLabel>

          <FieldLabel>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Gemini 2.0 Flash-Experimental</FieldTitle>
                <FieldDescription>
                  Experimental model with new features
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="Gemini 2.0 Flash-Experimental" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        {/* </FieldSet> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// return (
//   <Dialog>
//     <DialogTrigger asChild>
//       <Button type="button" variant={"ghost"}>
//         {field.value
//           ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
//           : "Select a model"}
//         <ChevronsDownIcon size={14} />
//       </Button>
//     </DialogTrigger>
//     <DialogContent>
//       <div className="mx-auto w-full max-w-sm">
//         <DialogHeader>
//           <DialogTitle>Select a model</DialogTitle>
//           <DialogDescription>Please kindly select a model</DialogDescription>
//         </DialogHeader>
//         <div className="p-4 pb-0">
//           <FormControl>
//             <RadioGroup
//               {...field}
//               value={field.value}
//               className="flex flex-col space-y-1"
//               onValueChange={field.onChange}
//               defaultValue="0">
//               <FormItem className="flex items-center space-x-3 justify-between">
//                 <div>
//                   <FormLabel>Gemini 1.0 Pro</FormLabel>
//                   <FormDescription>Doesnt support File input</FormDescription>
//                 </div>
//                 <FormControl>
//                   <RadioGroupItem value="Gemini 1.0 Pro" />
//                 </FormControl>
//               </FormItem>
//               <FormItem className="flex items-center justify-between">
//                 <FormLabel>Gemini 1.5 Pro</FormLabel>
//                 <FormControl>
//                   <RadioGroupItem value="Gemini 1.5 Pro" />
//                 </FormControl>
//               </FormItem>
//               <FormItem className="flex items-center justify-between">
//                 <FormLabel>Gemini 1.5 Flash</FormLabel>
//                 <FormControl>
//                   <RadioGroupItem value="Gemini 1.5 Flash" />
//                 </FormControl>
//               </FormItem>
//               <FormItem className="flex items-center justify-between">
//                 <FormLabel>Gemini 1.5 Flash-8b</FormLabel>
//                 <FormControl>
//                   <RadioGroupItem value="Gemini 1.5 Flash-8b" />
//                 </FormControl>
//               </FormItem>
//               <FormItem className="flex items-center justify-between">
//                 <FormLabel>Gemini 2.0 Flash-Experimental</FormLabel>
//                 <FormControl>
//                   <RadioGroupItem value="Gemini 2.0 Flash-Experimental" />
//                 </FormControl>
//               </FormItem>
//             </RadioGroup>
//           </FormControl>
//         </div>
//       </div>
//     </DialogContent>
//   </Dialog>
// );

export default ModelSelection;
