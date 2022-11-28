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
        <p>This is a phishing proof of concept email</p>
        <p>Opening an email like this in a non-internal testing situation could lead to credentials being stolen</p>
        <p>Best,</p>
        <p style="padding-bottom: 30px;">Security Source</p>
        <p style="text-align: center">
            <a href="${phishUrl}?testId=${String(testId)}" style="background-color: #00a4ef; padding-right: 100px; padding-left: 100px; padding-top: 10px; padding-bottom: 10px;">
                <span style="color: white; text-align-center; text-decoration: none; text-underline: none; font-family: sans-serif;">Go to mock landing page</span>
            </a>
        </p>
    </div>
</body>
</html>
`}