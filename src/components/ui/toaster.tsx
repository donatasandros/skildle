"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { AlertCircleIcon } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-x-4">
              {variant === "destructive" && (
                <div className="relative flex items-center justify-center size-5 before:content-[''] before:absolute before:size-[38px] before:rounded-full before:border-2 before:border-red-600 before:opacity-10 after:content-[''] after:absolute after:size-7 after:rounded-full after:border-2 after:border-red-600 after:opacity-40">
                  <AlertCircleIcon className="size-5 text-red-600" />
                </div>
              )}
              <div className="grid gap-y-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
