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