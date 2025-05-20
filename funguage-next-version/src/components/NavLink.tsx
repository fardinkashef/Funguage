"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        props.className,
        pathname === props.href &&
          "font-bold text-orange-700 bg-orange-100 hover:text-orange-500 hover:bg-orange-100"
      )}
    />
  );
}
