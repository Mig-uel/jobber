import { AppWindow, AreaChart, Layers } from 'lucide-react'

type NavLink = {
  href: string
  label: string
  icon: React.ReactNode
}

export const NavLinks: NavLink[] = [
  {
    href: '/add-job',
    icon: <Layers />,
    label: 'Add Job',
  },
  {
    href: '/jobs',
    icon: <AppWindow />,
    label: 'Jobs',
  },
  {
    href: '/stats',
    icon: <AreaChart />,
    label: 'Stats',
  },
]
