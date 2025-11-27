import { Book, DollarSign, Ellipsis, Plus, Settings } from 'lucide-react';
import { DiscordIcon, GithubIcon, HeartFilledIcon, Logo, SearchIcon, TwitterIcon } from '@/components/icons';
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import {
  Sidebar as InternalSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './sidebar';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Kbd } from '@heroui/kbd';
import { Link } from '@heroui/link';
import { ThemeSwitch } from '@/components/theme-switch';
import clsx from 'clsx';
import { link as linkStyles } from '@heroui/theme';
import { siteConfig } from '@/config/site';
import { useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const { state, isMobile } = useSidebar();

  const { pathname } = useLocation();

  return (
    <InternalSidebar collapsible="icon" side="left">
      <SidebarContent>
        <SidebarHeader>
          <Link className="text-xl font-bold p-2 transition-opacity duration-200 flex gap-2 items-center" href="/">
            <Logo />
            {(state === 'expanded' || isMobile) && <p className="font-bold text-inherit">ACME</p>}
          </Link>
        </SidebarHeader>

        <SidebarMenu className="gap-3">
          <SidebarMenuItem>
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm',
              }}
              endContent={
                <Kbd className="hidden lg:inline-block" keys={['command']}>
                  K
                </Kbd>
              }
              labelPlacement="outside"
              placeholder="Search..."
              startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
              type="search"
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as={Link} href="/docs" isActive={pathname === '/docs'} tooltip="Docs">
              <Book />
              <span>Docs</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>4</SidebarMenuBadge>
          </SidebarMenuItem>

          {Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuSkeleton />
            </SidebarMenuItem>
          ))}

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add Project">
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <SidebarMenuButton as={Link} href="/pricing" isActive={pathname === '/pricing'} tooltip="Kanban">
                  <DollarSign />
                  <span>Pricing</span>
                </SidebarMenuButton>
                <SidebarMenuAction>
                  <Ellipsis />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Public</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton as={Link} href="/blog" isActive={pathname === '/blog'}>
                  Blog
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton as={Link} href="/about" isActive={pathname === '/about'}>
                  About
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarFooter>
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </InternalSidebar>
  );
};

export const Navbar = () => {
  const { isMobile } = useSidebar();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarItem>
          <SidebarTrigger
            size="sm" // Smaller size for the navbar button
          />
        </NavbarItem>
        {isMobile && (
          <NavbarBrand className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" color="foreground" href="/">
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </Link>
          </NavbarBrand>
        )}
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2">
          <Link isExternal className="hidden sm:block" href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal className="hidden sm:block" href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: 'bg-default-100',
              input: 'text-sm',
            }}
            endContent={
              <Kbd className="hidden lg:inline-block" keys={['command']}>
                K
              </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
            type="search"
          />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
