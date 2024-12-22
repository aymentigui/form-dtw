const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
export const publicRoutes =[
    NEXTAUTH_URL+"/",NEXTAUTH_URL+"/confermation"
]

export const authRoutes =[
    NEXTAUTH_URL+ "/auth/login",
]

export const apiAuthPrefix =NEXTAUTH_URL+"/api/auth"

export const defaultRedirect =NEXTAUTH_URL+"/admin/statistics"