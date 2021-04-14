import React,{useContext,useState} from 'react'
import PostObject from '../components/PostObject'
import SignUp from '../components/SignUp'


const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
   const [currentUser,setCurrentUser]=useState()
   


   const value={
       currentUser,
   
   }
    return (
        <AuthProvider value={value}>
            {children}
        </AuthProvider>
    )
}
