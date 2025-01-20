import { AppWindow, AreaChart, Layers } from 'lucide-react'

type NavLink = {
  href: string
  label: string
  icon: React.ReactNode
}

export const navLinks: NavLink[] = [
  {
    href: '/add-job',
    icon: <Layers />,
    label: 'Add Job',
  },
  {
    href: '/jobs',
    icon: <AppWindow />,
    label: 'All Jobs',
  },
  {
    href: '/stats',
    icon: <AreaChart />,
    label: 'Stats',
  },
]
