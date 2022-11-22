import { PrismaClient, Test, Organization, Entry, Employee, Account } from '@prisma/client'
const prisma = new PrismaClient()

export async function createPhishingEntry(email: string, testId: number): Promise<boolean> {
    try {
        const phishedEmployee: Employee | null = await prisma.employee.upsert({
            where: { email: email },
            create: {
                email,
                Entry: {
                    create: {
                        testId: testId
                    }
                }
            },
            update: {
                Entry: {
                    create: {
                        testId: testId
                    }
                }
            }
        })
        return !!(phishedEmployee)
    } catch (error) {
        return false
    }
}

export async function createPhishingTest(accountId: number): Promise<Test | boolean> {
    try {
        const organization: Organization | null = await prisma.organization.findUnique({
            where: {
                accountId: accountId
            }
        })
        if (!organization) throw new Error('No organization associated with account')
        const newTest: Test = await prisma.test.create({
            data: {
                organization: { connect: { id: organization.id } },
                type: 'Phishing',
            }
        })
        return newTest
    } catch (error) {
        return false
    }
}

export async function getActivePhishingTests(accountId: number): Promise<Organization | boolean> {
    try {
        const populatedAccount: Organization | null = await prisma.organization.findUnique({
            where: { accountId: accountId },
            include: {
                Test: {
                    include: {
                        Entry: {
                            include: {
                                employee: true
                            }
                        }
                    }
                }

            }
        })
        if (!populatedAccount) throw new Error('could not query account')
        return populatedAccount
    } catch (error) {
        return false
    }
}

