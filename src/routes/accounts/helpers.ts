import { PrismaClient, Account } from '@prisma/client'
const prisma = new PrismaClient()

export async function checkOnlyEmail(email: string): Promise<Boolean> {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: email
            }
        })
        return !(account)
    } catch (error) {
        return false
    }
}

export async function createAccount(email: string, password: string, organizationName: string): Promise<Account | boolean> {
    try {
        const account = await prisma.account.create({
            data: {
                email,
                password,
                Organization: {
                    create: {
                        name: organizationName
                    }
                }

            }
        })
        if (!account) throw new Error('No Account Created')
        return account
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function findAccount(email: string): Promise<Account | boolean> {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: email
            }
        })
        if (!account) throw new Error('No Account Found')
        return account
    } catch (error) {
        console.log(error)
        return false
    }
}