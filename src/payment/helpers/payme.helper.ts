import axios from 'axios';

const PAYME_BASE_URL = 'https://checkout.paycom.uz/api'; // Sandbox yoki haqiqiy URL
const PAYME_AUTH = Buffer.from(`${process.env.PAYME_MERCHANT_ID}:${process.env.PAYME_SECRET_KEY}`).toString('base64');

export const paymeApi = axios.create({
  baseURL: PAYME_BASE_URL,
  headers: {
    Authorization: `Basic ${PAYME_AUTH}`,
    'Content-Type': 'application/json',
  },
});

export async function createTransaction(amount: number, orderId: number) {
  const response = await paymeApi.post('/', {
    method: 'CreateTransaction',
    params: {
      amount: amount * 100, // So‘mni tiyingacha konvertatsiya qilish
      account: {
        order_id: orderId,
      },
    },
  });

  return response.data.result;
}

export async function checkTransaction(transactionId: string) {
  const response = await paymeApi.post('/', {
    method: 'CheckTransaction',
    params: { id: transactionId },
  });

  return response.data.result;
}
