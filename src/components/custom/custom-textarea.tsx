import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface CustomTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

const CustomTextarea = ({
  name,
  label,
  placeholder,
  disabled = false,
  rows = 4,
}: CustomTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <div>
        {label && (
          <FormLabel
            htmlFor={name}
            className={`block text-sm font-medium text-grayscale-900 mb-2 ${
              errors[name] ? "!text-red-500" : ""
            }`}
          >
            {label}
          </FormLabel>
        )}

        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className="flex w-full flex-col relative">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  rows={rows}
                  disabled={disabled}
                  className={cn(errors[name] && "ring-1 !ring-red-500")}
                />
              </FormControl>
            </div>
          )}
        />
        {errors[name] && (
          <FormMessage className="text-red-500 mt-1">
            {errors[name]?.message as string}
          </FormMessage>
        )}
      </div>
    </FormItem>
  );
};

export default CustomTextarea;
