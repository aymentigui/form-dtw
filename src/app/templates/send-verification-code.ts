export function getSendVerificationCodeTemplate(code: string): string {
    return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code de vérification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .email-header {
        background-color: #4CAF50;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .email-header h1 {
        margin: 0;
        font-size: 24px;
      }
      .email-body {
        padding: 20px;
        color: #333333;
      }
      .email-body p {
        margin: 0 0 10px;
        font-size: 16px;
      }
      .verification-code {
        font-size: 24px;
        font-weight: bold;
        color: #4CAF50;
        text-align: center;
        margin: 20px 0;
      }
      .email-footer {
        background-color: #f1f1f1;
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Votre code de vérification</h1>
      </div>
      <div class="email-body">
        <p>Bonjour,</p>
        <p>Nous avons reçu une demande pour vérifier votre adresse e-mail. Voici votre code de vérification :</p>
        <div class="verification-code">${code}</div>
        <p>Ce code est valide pendant les 15 prochaines minutes.</p>
        <p>Si vous n'avez pas fait cette demande, veuillez ignorer cet e-mail.</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 Direction des transports de wilaya d'Alger - DTW. Tous droits réservés.</p>
      </div>
    </div>
  </body>
  </html>`;
  }
  