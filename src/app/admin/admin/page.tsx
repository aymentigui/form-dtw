import { getAdmins } from '@/actions/adminActions'
import AdminList from './AdminList'

export default async function AdminPage() {
  const admins = await getAdmins()


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
      <AdminList admins={admins} />
    </div>
  )
}

