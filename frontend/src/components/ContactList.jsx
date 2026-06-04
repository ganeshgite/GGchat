 import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
 
 const ContactList = () => {
    const {getAllContacts , allContacts , selectedUser , setSelectedUser , isUsersLoading  } = useChatStore()
    useEffect(()=>{
        getAllContacts()
    },[getAllContacts])  
    if(isUsersLoading) return <UsersLoadingSkeleton/>  

    console.log(selectedUser)
   return (
     <>
        {
            allContacts.map((contact)=>(
                <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
            <div className="flex items-center gap-3">
                <div className={' avatar online '} >
                    <div className='size-12 rounded-fulp ' >
                        <img src={ contact.profile || "/avatar.png" } />
                    </div>
                </div>
                <h4 className=' text-slate-200 ' > {contact.fullName} </h4> 
            </div>

        </div>
            ))
        }
     </>
   )
 }
 
 export default ContactList