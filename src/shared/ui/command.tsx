"use client";

import { SearchIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "shared/lib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "shared/ui/dialog";
import { Input } from "shared/ui/input";

export function Command({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground rounded-xl p-1",
        className,
      )}
      {...props}
    />
  );
}

export function CommandDialog({
  title = "Команды",
  description = "Быстрый поиск",
  children,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn("overflow-hidden p-0", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-2">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-2 left-2 size-4 text-muted-foreground" />
        <Input className={cn("pl-8", className)} {...props} />
      </div>
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-list"
      className={cn("max-h-72 overflow-y-auto p-1", className)}
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-group"
      className={cn("space-y-1 p-1", className)}
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="command-separator"
      className={cn("border-border", className)}
      {...props}
    />
  );
}

export function CommandItem({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="command-item"
      className={cn(
        "hover:bg-muted flex w-full rounded-md px-2 py-1.5 text-left text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ml-auto text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
