export function getUserConfirmationTemplate(user: any, qrCodeUrl: string): string {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation d'inscription</title>
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
        .user-info {
          background-color: #f1f1f1;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }
        .user-info p {
          margin: 5px 0;
          font-size: 14px;
        }
        .email-footer {
          background-color: #f1f1f1;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #666666;
        }
        .qr-code {
          text-align: center;
          margin-top: 20px;
        }
        .qr-code img {
          max-width: 200px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Confirmation de votre inscription</h1>
        </div>
        <div class="email-body">
          <p>Bonjour ${user.name || 'utilisateur'},</p>
          <p>Nous avons le plaisir de confirmer votre inscription. Voici les détails que vous avez fournis :</p>
          <div class="user-info">
            <p><strong>Id :</strong> ${user.id || 'Non renseigné'}</p> 
            <p><strong>Nom complet :</strong> ${user.name || 'Non renseigné'}</p>
            <p><strong>Nom en arabe :</strong> ${user.arabicName || 'Non renseigné'}</p>
            <p><strong>Email :</strong> ${user.email}</p>
            <p><strong>Date de naissance :</strong> ${user.dateOfBirth?.toLocaleDateString() || 'Non renseignée'}</p>
            <p><strong>Adresse :</strong> ${user.address || 'Non renseignée'}</p>
            <p><strong>Numéro de téléphone :</strong> ${user.phoneNumber || 'Non renseigné'}</p>
            <p><strong>Type d'activité :</strong> ${user.activityType || 'Non renseigné'}</p>
            <p><strong>Numéro NIN :</strong> ${user.nin || 'Non renseigné'}</p>
            <p><strong>Numéro transporteur :</strong> ${user.transporterNumber || 'Non renseigné'}</p>
            <p><strong>Société :</strong> ${user.isSociety ? user.societyName || 'Personne morale (entreprise)' : 'Personne physique (individu)'}</p>
          </div>
          <div class="qr-code">
            <p>Voici votre QR code :</p>
            <img src="data:image/png;base64,${qrCodeUrl}" alt="QR Code" />
          </div>
        </div>
        <div class="email-footer">
          <p>&copy; 2024 Direction des transports de wilaya d'Alger - DTW. Tous droits réservés.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  