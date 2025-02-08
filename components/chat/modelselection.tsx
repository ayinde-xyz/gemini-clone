"use client";
import { FormControl, FormDescription, FormItem, FormLabel } from "../ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { ChatSchemaType } from "@/schemas";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { ChevronsDownIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Model = {
  field: ControllerRenderProps<ChatSchemaType, "model">;
};

const ModelSelection = ({ field }: Model) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button type="button" variant={"ghost"}>
            {field.value
              ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
              : "Select a model"}
            <ChevronsDownIcon size={14} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Select a model</DrawerTitle>
              <DrawerDescription>
                Please kindly select a model
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value}
                  className="flex flex-col space-y-1"
                  onValueChange={field.onChange}
                  defaultValue="0">
                  <FormItem className="flex items-center space-x-3 justify-between">
                    <div>
                      <FormLabel>Gemini 1.0 Pro</FormLabel>
                      <FormDescription>
                        Doesnt support file input
                      </FormDescription>
                    </div>
                    <FormControl>
                      <RadioGroupItem value="Gemini 1.0 Pro" />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Gemini 1.5 Pro</FormLabel>
                    <FormControl>
                      <RadioGroupItem value="Gemini 1.5 Pro" />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Gemini 1.5 Flash</FormLabel>
                    <FormControl>
                      <RadioGroupItem value="Gemini 1.5 Flash" />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Gemini 1.5 Flash-8b</FormLabel>
                    <FormControl>
                      <RadioGroupItem value="Gemini 1.5 Flash-8b" />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Gemini 2.0 Flash-Experimental</FormLabel>
                    <FormControl>
                      <RadioGroupItem value="Gemini 2.0 Flash-Experimental" />
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"ghost"}>
          {field.value
            ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
            : "Select a model"}
          <ChevronsDownIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>Select a model</DialogTitle>
            <DialogDescription>Please kindly select a model</DialogDescription>
          </DialogHeader>
          <div className="p-4 pb-0">
            <FormControl>
              <RadioGroup
                {...field}
                value={field.value}
                className="flex flex-col space-y-1"
                onValueChange={field.onChange}
                defaultValue="0">
                <FormItem className="flex items-center space-x-3 justify-between">
                  <div>
                    <FormLabel>Gemini 1.0 Pro</FormLabel>
                    <FormDescription>Doesnt support File input</FormDescription>
                  </div>
                  <FormControl>
                    <RadioGroupItem value="Gemini 1.0 Pro" />
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Gemini 1.5 Pro</FormLabel>
                  <FormControl>
                    <RadioGroupItem value="Gemini 1.5 Pro" />
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Gemini 1.5 Flash</FormLabel>
                  <FormControl>
                    <RadioGroupItem value="Gemini 1.5 Flash" />
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Gemini 1.5 Flash-8b</FormLabel>
                  <FormControl>
                    <RadioGroupItem value="Gemini 1.5 Flash-8b" />
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Gemini 2.0 Flash-Experimental</FormLabel>
                  <FormControl>
                    <RadioGroupItem value="Gemini 2.0 Flash-Experimental" />
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelection;
