import { logOut } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import React from 'react'

const LogOutComp = () => {
  return (
    <div>
        <form action={async()=>
          { 
            "use server"
            await logOut() 
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
