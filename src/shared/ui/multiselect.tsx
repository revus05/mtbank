"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import type { ComponentProps, FC } from "react";
import * as React from "react";
import { cn } from "shared/lib/cn";
import { Badge } from "shared/ui/badge";
import { Button } from "shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "shared/ui/popover";

interface MultiSelectProps extends ComponentProps<typeof Button> {
  values: { label: string; value: string; colorHex?: string }[];
  selected: string[];
  onValuesChangeAction: (value: string[]) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  onValuesChangeAction,
  selected,
  values,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onValuesChangeAction(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-75 justify-between min-h-8 h-fit py-1"
          {...props}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length === 0 && "Выберите значения"}
            {selected.map((value) => {
              const item = values.find((v) => v.value === value);
              return (
                <Badge
                  key={value}
                  variant="secondary"
                  className="inline-flex items-center gap-2 border border-tertiary"
                >
                  {item?.colorHex && (
                    <span
                      className="size-3 rounded-full border"
                      style={{ background: item.colorHex }}
                    />
                  )}
                  {item?.label}
                </Badge>
              );
            })}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-75 p-0">
        <Command>
          <CommandInput placeholder="Поиск..." />
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup>
            {values.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => toggleValue(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(item.value) ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.colorHex && (
                  <span
                    className="size-3 rounded-full border"
                    style={{ background: item.colorHex }}
                  />
                )}
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
