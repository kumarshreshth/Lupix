import emailjs from '@emailjs/browser';
const serviceId = import.meta.env.VITE_serviceId;
const templateIdService = import.meta.env.VITE_templateIdService;
const publicKey = import.meta.env.VITE_publicKey;
const templateIdDoubt = import.meta.env.VITE_templateIdDoubt;

export async function sendMail(data) {
  try {
    const templateParam = {
      name: `${data.name}`,
      email: `${data.email}`,
      phoneNumber: `${data.phoneNumber}`,
      description: `${data.description}`,
    };

    const response = await emailjs.send(
      serviceId,
      templateIdService,
      templateParam,
      publicKey
    );
    return response.text;
  } catch (error) {
    throw error;
  }
}

export async function sendDoubt(message) {
  const templateParam = {
    message: message.text,
    email: message.email,
  };
  try {
    const response = await emailjs.send(
      serviceId,
      templateIdDoubt,
      templateParam,
      publicKey
    );
    return response.text;
  } catch (error) {
    throw error;
  }
}
