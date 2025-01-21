'use client'

import { AlignLeft } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { navLinks } from '@/utils/links'
import Link from 'next/link'
import { useState } from 'react'

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' size='icon'>
          <AlignLeft />
          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-52 lg:hidden'
        align='start'
        sideOffset={25}
      >
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className='flex items-center gap-x-2'>
              {link.icon} <span className='capitalize'>{link.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
