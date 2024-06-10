"use client"

import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

interface NavProps {
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost",
    route: string | ""
  }[]
}

export function Nav({ links }: NavProps) {
  const url = window.location.href;

    const navigate = useNavigate()

  useEffect(() => {
    if(!sessionStorage.getItem("token")){
        navigate("/login")
    }
  },[])

  return (
    <div
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
            (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <a
                  href={link.route}
                  className={cn(
                    buttonVariants({ variant: url.includes(link.route) ? "default" : "ghost", size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) 
        )}
      </nav>
    </div>
  )
}
