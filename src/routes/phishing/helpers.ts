import { PrismaClient, Test, Organization, Entry, Employee, Account } from '@prisma/client'
import { emailTemplate1 } from './assets/emailtemplate'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_KEY || '')

const prisma = new PrismaClient()

export async function createPhishingEntry(email: string, testId: number, timestamp: string): Promise<boolean> {
    try {
        const phishedEmployee: Employee | null = await prisma.employee.upsert({
            where: { email: email },
            create: {
                email,
                Entry: {
                    create: {
                        testId: testId,
                        timestamp: timestamp
                    }
                }
            },
            update: {
                Entry: {
                    create: {
                        testId: testId,
                        timestamp: timestamp
                    }
                }
            }
        })
        return !!(phishedEmployee)
    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        return false
    }
}

export async function sendPhishingEmails(bccList: Array<string>, testId: number): Promise<boolean> {
    try {
        if (Array.isArray(bccList) && bccList.length < 20 && testId) {
            const emailTemplate = emailTemplate1(testId)
            const message = {
                to: process.env.ADMIN_EMAIL,
                bcc: [...bccList],
                from: 'aebsdevteam@gmail.com', // Change to your verified sender
                subject: 'Security Source Test Email - TESTING CYBERSEC PHISHING TOOL',
                text: 'Important Account Information',
                html: emailTemplate
            }

            await sgMail.send(message)


            return true
        }
        else {
            throw new Error('Bcc list too long or no testid')
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        return false
    }
}

