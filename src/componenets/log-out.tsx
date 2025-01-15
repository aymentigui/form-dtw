"use client"
import { logOut } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOutComp = () => {
  const router = useRouter()

  const logOutSubmit = async () => {
    const redir = await logOut()
    if (redir)
      router.push("/")
  }
  return (
    <div>
      <Button onClick={logOutSubmit}>
        <LogOut />
      </Button>
    </div>
  )
}

export default LogOutComp
