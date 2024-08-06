import type { NextApiRequest, NextApiResponse } from 'next';

const secretKey = process.env.RECAPTCHA_SECRET_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { recaptchaToken, ...formData } = req.body;

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const response = await fetch(verificationUrl, {
      method: 'POST',
    });

    const verificationResponse = await response.json();

    if (!verificationResponse.success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    // Handle your form submission logic here (e.g., save to database, send email, etc.)
    res.status(200).json({ message: 'Form submitted successfully', data: formData });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;
