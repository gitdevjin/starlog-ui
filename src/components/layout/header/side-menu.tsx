import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DoorOpen,
  Home,
  Rocket,
  Satellite,
  Settings,
  Shell,
  SquareActivity,
  Telescope,
} from "lucide-react";
import logo from "@/assets/logo4.png";
import { Link } from "react-router";
import { useSession } from "@/hooks/queries/use-session";

const getItems = (userId?: string) => [
  {
    title: "Universe",
    url: "/",
    icon: Home,
  },
  {
    title: "Galaxy",
    url: "#",
    icon: Shell,
  },
  {
    title: "Orbiting",
    url: "#",
    icon: Satellite,
  },
  {
    title: "Orbiter",
    url: "#",
    icon: Rocket,
  },
  {
    title: "Signal",
    url: "#",
    icon: SquareActivity,
  },
  {
    title: "Observatory",
    url: "#",
    icon: Telescope,
  },
  {
    title: "Stargate",
    url: userId ? `/stargate/${userId}` : "/sign-in",
    icon: DoorOpen,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export default function SideMenu() {
  const { data: user } = useSession();
  const items = getItems(user?.id);

  return (
    <Sidebar>
      <SidebarContent className="p-6">
        <SidebarGroup className="gap-2">
          <SidebarGroupLabel className="mb-2 text-xl">
            <img className="h-7 opacity-50" src={logo} alt="Logo of StarLog" />
            <span className="bg-linear-to-r from-purple-400 via-violet-300 to-purple-200 bg-clip-text text-xl font-bold text-transparent">
              &nbsp;&nbsp;StarLog
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu className="gap-4 p-2 pr-0">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    className="min-h-11 [&>svg]:h-6 [&>svg]:w-6"
                  >
                    <Link to={item.url} className="flex items-center gap-4">
                      <item.icon className="h-9 w-9" />
                      <span className="text-xl font-normal tracking-wider">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
