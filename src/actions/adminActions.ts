'use server'

import { prisma } from '@/app/util/db'
import bcrypt from 'bcrypt'


export async function getAdmins() {
  return await prisma.admin.findMany()
}

export async function updateAdminWilaya(adminId: string, newWilaya: number) {
  await prisma.admin.update({
    where: { id: adminId },
    data: { wilaya: newWilaya },
  })
}

export async function changeAdminPassword(adminId: string, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await prisma.admin.update({
    where: { id: adminId },
    data: { password: hashedPassword },
  })
}

export async function addNewAdmin(email: string, password: string, wilaya: number) {
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      wilaya,
    },
  })
}

export async function deleteAdmin(adminId: string) {
  await prisma.admin.delete({
    where: { id: adminId },
  })
}

