addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const allowedOrigin = 'valid_url_here'; //your url goes here

  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
      return handleOptions(request, allowedOrigin);
  }

  // Check if the request method is POST
  if (request.method !== 'POST') {
      return new Response('Method not allowed', {
          status: 405,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin }
      });
  }

  // Verify the origin of the request
  const origin = request.headers.get('Origin');
  if (origin !== allowedOrigin) {
      return new Response('Forbidden', {
          status: 403,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin }
      });
  }

  // Parse the request body
  const contentType = request.headers.get('Content-Type');
  if (contentType.includes('application/json')) {
      const json = await request.json();
      return processFormData(json, allowedOrigin);
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      return processFormData(data, allowedOrigin);
  } else {
      return new Response('Unsupported Media Type', {
          status: 415,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin }
      });
  }
}

async function processFormData(data, allowedOrigin) {
  // Format the message for Telegram using Markdown
  let message = `*New contact form submission from ${data.pageTitle}*\n`;
  message += `*Page URL:* [${data.pageTitle}](${data.pageUrl})\n`;
  for (const [key, value] of Object.entries(data)) {
      if (key !== 'pageUrl' && key !== 'pageTitle') {
          message += `*${key}:*\n\`\`\`\n${value}\n\`\`\`\n`;
      }
  }

  // Inline keyboard button
  const inlineKeyboard = {
      inline_keyboard: [
          [
              {
                  text: `Visit ${data.pageTitle}`,
                  url: data.pageUrl
              }
          ]
      ]
  };

  // Send the message to Telegram
  const telegramToken = TELEGRAM_API_KEY;
  const chatId = TELEGRAM_CHAT_ID;
  const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  try {
      const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'Markdown', // Specify Markdown formatting
              reply_markup: inlineKeyboard // Attach inline keyboard
          })
      });

      if (response.ok) {
          return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': allowedOrigin
              },
              status: 200
          });
      } else {
          return new Response(JSON.stringify({ message: 'Failed to send message' }), {
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': allowedOrigin
              },
              status: 500
          });
      }
  } catch (error) {
      return new Response(JSON.stringify({ message: 'Failed to send message' }), {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': allowedOrigin
          },
          status: 500
      });
  }
}

function handleOptions(request, allowedOrigin) {
  const headers = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
  };
  return new Response(null, { headers });
}
