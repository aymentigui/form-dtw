'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { updateAdminWilaya, changeAdminPassword, addNewAdmin, deleteAdmin } from '@/actions/adminActions'
import { Admin } from '@prisma/client'
import { LockIcon, PlusIcon, Trash2 } from 'lucide-react'

type AdminListProps = {
  admins: Admin[]
}

export default function AdminList({ admins }: AdminListProps) {
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [newAdminWilaya, setNewAdminWilaya] = useState('Tous')

  const handleWilayaChange = async (adminId: string, newWilaya: string) => {
    await updateAdminWilaya(adminId, parseInt(newWilaya))
  }

  const handlePasswordChange = async (adminId: string, newPassword: string) => {
    await changeAdminPassword(adminId, newPassword)
  }

  const handleAddNewAdmin = async () => {
    const wilaya=newAdminWilaya=="Tous"?0:parseInt(newAdminWilaya)
    await addNewAdmin(newAdminEmail, newAdminPassword, wilaya)
    setNewAdminEmail('')
    setNewAdminPassword('')
    setNewAdminWilaya('Tous')
  }

  const handleDeleteAdmin = async (adminId: string) => {
    await deleteAdmin(adminId)
    window.location.reload();
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Admin
          </Button>
        </DialogTrigger>
        <DialogContent className='h-96'>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
            />            
            <Select value={  newAdminWilaya || '0'} onValueChange={setNewAdminWilaya}>
              <SelectTrigger>
                <SelectValue placeholder="Wilaya" />
              </SelectTrigger>
              <SelectContent className='h-56'>
                {[...Array(59)].map((_, i) => (
                  <SelectItem key={i} value={i===0?"Tous":i.toString()}>{i===0?"Tous":i}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddNewAdmin}>Add Admin</Button>
          </div>
        </DialogContent>
      </Dialog>

      {admins.map((admin) => (
        <div key={admin.id} className="mb-4 p-4 border rounded">
          <p className="font-bold">{admin.email}</p>
          <div className="flex items-center mt-2">
            
            <Select value={(admin.wilaya?.toString()=="0"?"Tous":admin.wilaya?.toString()) || 'Tous'}
              onValueChange={(value) => handleWilayaChange(admin.id, (value=="Tous"?"0":value))}>
              <SelectTrigger>
                <SelectValue placeholder="Wilaya" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(59)].map((_, i) => (
                  <SelectItem key={i} value={i===0?"Tous":i.toString()}>{i===0?"Tous":i.toString()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="ml-2" onClick={() => handleWilayaChange(admin.id, (admin.wilaya?.toString()=="Tous"?"0":admin.wilaya?.toString()) || '0')}>
              Confirm
            </Button>
            <Button variant="outline" className="ml-2 bg-red-500 text-white" onClick={() => handleDeleteAdmin(admin.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <LockIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <Input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => handlePasswordChange(admin.id, e.target.value)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  )
}

