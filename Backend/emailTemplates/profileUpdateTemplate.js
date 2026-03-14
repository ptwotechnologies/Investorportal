const profileUpdateTemplate = (changes) => {
  const changeRows = changes
    .map(
      (c) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>${c.field}</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #d9534f;">${c.old}</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #5cb85c;">${c.new}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #333;">Profile Update Notification</h2>
      <p>Hello,</p>
      <p>We wanted to let you know that your profile details were recently updated. Below is a summary of the changes:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f8f8f8;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Field</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Old Value</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">New Value</th>
          </tr>
        </thead>
        <tbody>
          ${changeRows}
        </tbody>
      </table>
      
      <p style="margin-top: 30px; font-size: 12px; color: #888;">
        If you did not make these changes, please contact support immediately.
      </p>
      <p style="font-size: 12px; color: #888;">
        This is an automated message from Artestor Investor Portal.
      </p>
    </div>
  `;
};

export default profileUpdateTemplate;
