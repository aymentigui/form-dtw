'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  isSociety: boolean
  societyName: string | null
  address: string | null
  dateOfBirth: string | null
  phoneNumber: string | null
  activityType: string | null
  nin: string | null
  transporterNumber: string | null
  createdAt: string
}

interface PaginatedResponse {
  users: User[]
  totalUsers: number
  totalPages: number
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  const usersPerPage = 100

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (page = 1) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: usersPerPage.toString(),
      search: searchTerm,
      dateFrom,
      dateTo
    })

    const response = await fetch(`/api/admin/users?${queryParams}`)
    const data: PaginatedResponse = await response.json()
    setUsers(data.users)
    setTotalUsers(data.totalUsers)
    setTotalPages(data.totalPages)
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchUsers(1)
  }, [searchTerm, dateFrom, dateTo])

  const handleSearch = () => {
    fetchUsers(1)
  }

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau des utilisateurs</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="md:w-1/4"
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="md:w-1/4"
        />
        <Button onClick={handleSearch}>Rechercher</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom et prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nom de la société</TableHead>
              <TableHead>Adresse de la société</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Activité</TableHead>
              <TableHead>NIN</TableHead>
              <TableHead>N° Transporteur</TableHead>
              <TableHead>Date d'inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isSociety ? 'Personne morale (entreprise)' : 'Personne physique (individu)'}</TableCell>
                <TableCell>{user.societyName || '-'}</TableCell>
                <TableCell>{user.address || '-'}</TableCell>
                <TableCell>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{user.phoneNumber || '-'}</TableCell>
                <TableCell>{user.activityType || '-'}</TableCell>
                <TableCell>{user.nin || '-'}</TableCell>
                <TableCell>{user.transporterNumber || '-'}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p>
          Affichage de {(currentPage - 1) * usersPerPage + 1} à {Math.min(currentPage * usersPerPage, totalUsers)} sur {totalUsers} utilisateurs
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

