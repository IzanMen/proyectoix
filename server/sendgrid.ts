// SendGrid Integration via Replit Connector
import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  const url = 'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid';
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'X_REPLIT_TOKEN': xReplitToken
    }
  });
  const data = await response.json();
  console.log('SendGrid connector response status:', response.status, 'items:', data.items?.length || 0);
  connectionSettings = data.items?.[0];

  if (!connectionSettings || (!connectionSettings.settings?.api_key && !connectionSettings.settings?.from_email)) {
    console.error('SendGrid connection details:', JSON.stringify({
      hasConnection: !!connectionSettings,
      hasSettings: !!connectionSettings?.settings,
      keys: connectionSettings?.settings ? Object.keys(connectionSettings.settings) : [],
      hostname,
    }));
    throw new Error('SendGrid not connected');
  }
  return {apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email};
}

export async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}
