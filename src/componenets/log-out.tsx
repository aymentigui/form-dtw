import { signOut } from '@/app/util/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import React from 'react'

const LogOutComp = () => {
  return (
    <div>
        <form action={async()=>
          { 
            "use server"
            await signOut()
          }
        }>
            <Button type='submit'>
                <LogOut />
            </Button>
        </form>
    </div>
  )
}

export default LogOutComp
