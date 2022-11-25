export function emailTemplate1(testId: number): string {
    const baseUrl = process.env?.HOST_URL
    const phishUrl = process.env?.PHISH_URL
    return `
<html>
<body>
    <div style="max-width: 500px; margin: 0 auto; background-color: #faf9f8; padding: 30px; font-family: sans-serif;">
        <p style="text-align:center; padding-top: 5px; padding-bottom: 5px;">
            <img src="${baseUrl}/assets/micosoft-phishing-icon.png">
        </p>
        <p>Dear user, There has been suspicious activity detected on yours account.</p>
        <p>please login with your username and password below in order to ensure your account remains secure</p>
        <p>Best,</p>
        <p style="padding-bottom: 30px;">Mircrosoft Support</p>
        <p style="text-align: center">
            <a href="${phishUrl}?testId=${String(testId)}" style="background-color: #00a4ef; padding-right: 100px; padding-left: 100px; padding-top: 10px; padding-bottom: 10px;">
                <span style="color: white; text-align-center; text-decoration: none; text-underline: none; font-family: sans-serif;">Reset Password</span>
            </a>
        </p>
    </div>
</body>
</html>
`}