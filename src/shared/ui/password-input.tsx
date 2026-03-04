"use client";

import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { cn } from "shared/lib";
import { Input } from "shared/ui/input";

export function PasswordInput({
  className,
  ...props
}: ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-9", className)}
        {...props}
      />
      <button
        type="button"
        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
        onClick={() => setShowPassword((value) => !value)}
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  );
}
