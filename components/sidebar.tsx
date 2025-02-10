"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, BarChart3, PlusCircle, Settings, HelpCircle, ChevronRight, ChevronLeft } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Investitionen",
    href: "/investments",
    icon: BarChart3,
  },
  {
    title: "Neue Investition",
    href: "/new-investment",
    icon: PlusCircle,
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: HelpCircle,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen, className }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-background border-r transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-[70px]",
        className,
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h2
          className={cn(
            "text-lg font-semibold tracking-tight transition-all duration-300",
            open ? "opacity-100" : "opacity-0 w-0",
          )}
        >
          EcoInvest
        </h2>
        <Button variant="ghost" size="icon" className="w-9 p-0" onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", open ? "px-2" : "px-0 py-2 justify-center")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn("h-5 w-5", open ? "mr-2" : "mx-auto")} />
                <span className={cn("transition-all duration-300", open ? "opacity-100" : "opacity-0 w-0")}>
                  {item.title}
                </span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

