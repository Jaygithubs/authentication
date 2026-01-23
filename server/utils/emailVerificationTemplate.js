const emailVerificationTemplate = (name, verifyLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table width="600" style="background:#ffffff; padding:20px; border-radius:8px;">
            <tr>
              <td align="center">
                <h2 style="color:#333;">Verify Your Email</h2>
              </td>
            </tr>
            <tr>
              <td>
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for registering. Please verify your email by clicking the button below.</p>

                <div style="text-align:center; margin:30px 0;">
                  <a href="${verifyLink}"
                     style="background:lab(64 44.36 71.55); color:#ffffff; padding:12px 24px;
                            text-decoration:none; border-radius:5px; font-weight:bold;">
                    Verify Email
                  </a>
                </div>

                <p>This link will expire in <strong>24 hours</strong>.</p>

                <p>If you did not create this account, please ignore this email.</p>

                <p style="margin-top:30px;">
                  Regards,<br/>
                  <strong>Your App Team</strong>
                </p>
              </td>
            </tr>
          </table>

          <p style="font-size:12px; color:#999; margin-top:10px;">
            © ${new Date().getFullYear()} Your App. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

module.exports = emailVerificationTemplate;
