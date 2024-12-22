"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface UserInfo {
  id: string
  name: string
  email: string
  isSociety: boolean
  societyName?: string
  address: string
  dateOfBirth: string
  phoneNumber: string
  activityType: string
  nin: string
  transporterNumber: string
}

function ConfirmationPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const userDataString = searchParams.get('data')
    if (userDataString) {
      try {
        const decodedData = decodeURIComponent(userDataString)
        const userData = JSON.parse(decodedData) as UserInfo
        setUserInfo(userData)
      } catch (error) {
        // handle error here
      }
    }
  }, [searchParams])

  const handlePdf = async () => {
    const element = document.querySelector('.container') as HTMLElement
    const button = document.querySelector('#download-button') as HTMLElement
    if (!element) return
    if (button) {
      button.style.display = 'none'
    }

    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Adjust dimensions to fit A4 page
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('confirmation-inscription.pdf')
    button.style.display = 'block'
  }

  if (!userInfo) {
    return <div>Chargement des informations...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center flex flex-row justify-between mb-8">
        <Image src="/logo.svg" alt="Logo" width={200} height={100} />
        <Image src={`/qr/${userInfo.id}.png`} alt="Logo secondaire" width={200} height={100} className="mt-4" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Confirmation d'inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Nom</h3>
              <p>{userInfo.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{userInfo.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Type</h3>
              <p>{userInfo.isSociety ? 'Société' : 'Individu'}</p>
            </div>
            {userInfo.isSociety && userInfo.societyName && (
              <div>
                <h3 className="font-semibold">Nom de la société</h3>
                <p>{userInfo.societyName}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold">Adresse</h3>
              <p>{userInfo.address}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date de naissance</h3>
              <p>{new Date(userInfo.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Numéro de téléphone</h3>
              <p>{userInfo.phoneNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">Type d'activité</h3>
              <p>{userInfo.activityType}</p>
            </div>
            <div>
              <h3 className="font-semibold">NIN</h3>
              <p>{userInfo.nin}</p>
            </div>
            <div>
              <h3 className="font-semibold">Numéro de transporteur</h3>
              <p>{userInfo.transporterNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-center mt-8">
        <button 
          id="download-button"
          onClick={handlePdf} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Imprimer cette page
        </button>
      </div>
    </div>
  )
}

export default function ConfirmationPageWrapper() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmationPage />
    </Suspense>
  )
}
