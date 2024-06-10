
import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  Search as Search2,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
// import { AccountSwitcher } from "@/app/(app)/examples/mail/components/account-switcher"
// import { MailDisplay } from "@/app/(app)/examples/mail/components/mail-display"
// import { MailList } from "@/app/(app)/examples/mail/components/mail-list"
import { Nav } from "./Nav"
import { PanelOnCollapse } from "react-resizable-panels"
import Get from "../Get"
import Create from "../Create"
import Search from "../Search"
import Edit from "../Edit"
import Delete from "../Delete"
import Logout from "../Logout"
// import { type Mail } from "@/app/(app)/examples/mail/data"
// import { useMail } from "@/app/(app)/examples/mail/use-mail"

interface PanelProps {
}

export function Panel({

}: PanelProps) {
  const url = window.location.href;

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className={ url.includes("/searchHeadline")  ? "" : "h-full max-h-screen" }
      >
        <ResizablePanel
          maxSize={30}
        >
          <Separator />
          <Nav
            links={[
              {
                title: "Create Headline",
                label: "",
                icon: Inbox,
                variant: "default",
                route: "/adminPanel/createHeadline"
              },
              {
                title: "Get Headline",
                label: "",
                icon: File,
                variant: "ghost",
                route: "/adminPanel/getHeadline"
              },
              {
                title: "Search Headline",
                label: "",
                icon: Search2,
                variant: "ghost",
                route: "/adminPanel/searchHeadline"
              },
              {
                title: "Edit Headline",
                label: "",
                icon: ArchiveX,
                variant: "ghost",
                route: "/adminPanel/editHeadline"
              },
              {
                title: "Delete Headline",
                label: "",
                icon: Trash2,
                variant: "ghost",
                route: "/adminPanel/deleteHeadline"
              },
              {
                title: "Logout",
                label: "",
                icon: Users2,
                variant: "ghost",
                route: "/adminPanel/logout"
              },
            ]}
          />
        </ResizablePanel>
        <ResizablePanel
        >
          {
            url.includes("/getHeadline") ? 
              <Get /> : 
              <></>
          }
          {
            url.includes("/createHeadline") ? 
              <Create /> : 
              <></>
          }
          {
            url.includes("/searchHeadline") ? 
              <Search /> : 
              <></>
          }
          {
            url.includes("/editHeadline") ? 
              <Edit /> : 
              <></>
          }
          {
            url.includes("/deleteHeadline") ? 
              <Delete /> : 
              <></>
          }
          {
            url.includes("/logout") ? 
              <Logout /> : 
              <></>
          }
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
