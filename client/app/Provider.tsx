import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect } from 'react'

const Provider = ({ children }: any) => {

    const { user } = useUser();
    const CreateUser = useMutation(api.users.CreateNewUser);

    useEffect(() => {
        user && CreateNewUser();

    }, [user])



    const CreateNewUser = async () => {

        if (user) {
            const result = await CreateUser({
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user?.imageUrl,
                name: user?.fullName ?? ''

            })
            console.log(result)
        }
    }

    return (
        <div>
            <div>{children}</div>
        </div>
    )
}

export default Provider
