import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface CustomInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
}

const CustomInput = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className = "",
}: CustomInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <div className={className}>
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
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  className={cn(errors[name] && "ring-1 !ring-red-500")}
                  disabled={disabled}
                />
              </FormControl>
            </div>
          )}
        />
      </div>
      {errors[name] && (
        <FormMessage className="text-red-500 mt-1">
          {errors[name]?.message as string}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default CustomInput;
