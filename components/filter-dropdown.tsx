"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-comet-border rounded-lg text-sm font-medium font-body text-comet-text hover:border-comet-indigo/40 transition-colors">
          {selectedLabel && value !== "" ? selectedLabel : label}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <ChevronDown size={14} className="text-comet-muted" />
          </motion.span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content asChild forceMount sideOffset={6}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-comet-border rounded-xl shadow-lg shadow-black/5 py-1.5 min-w-[180px] z-50"
              >
                {options.map((opt) => (
                  <DropdownMenu.Item
                    key={opt.value}
                    onSelect={() => onChange(opt.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm font-body rounded-lg cursor-pointer hover:bg-comet-surface outline-none mx-1",
                      value === opt.value
                        ? "text-comet-indigo font-medium"
                        : "text-comet-text"
                    )}
                  >
                    {opt.label}
                    {value === opt.value && (
                      <Check size={13} className="text-comet-indigo" />
                    )}
                  </DropdownMenu.Item>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
