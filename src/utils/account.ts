import { PrismaClient, Organization } from '@prisma/client'
const prisma = new PrismaClient()

export async function createAccountWithOrganization(username: string, password: string, organization: Organization) : Promise<Boolean> {
    try {
        console.log(username,password)
        const account = await prisma.account.create({
            data: {
                username,
                password
            }
        })

        const accountOrganization = await prisma.organization.create({
            data: {
                name: organization.name,
                owner: {
                    connect: { id: account.id }
                }
                
            }
        })

        console.log(accountOrganization)
        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}