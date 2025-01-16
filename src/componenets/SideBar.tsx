'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, BarChart } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            pathname === '/admin/dashboard' ? 'bg-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <Users size={20} />
          <span>Utilisateurs</span>
        </Link>
        <Link 
          href="/admin/statistics" 
          className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            pathname === '/admin/statistics' ? 'bg-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <BarChart size={20} />
          <span>Statistiques</span>
        </Link>
      </nav>
    </div>
  )
}

