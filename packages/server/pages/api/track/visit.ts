import { NextApiRequest, NextApiResponse } from 'next';
import { isTrackingRequestBody } from '../../../type-guards';
import { createVisit, getAllVisits } from '../../../database/models/visit';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (!(request.method === 'POST') || !isTrackingRequestBody(request.body)) {
    response.status(400).json({
      message: 'Only POST is allowed, with tracking request in the body',
      method: request.method,
      body: request.body,
    });
    return;
  }
  await createVisit({
    userId: 'myUserId',
    url: 'http://localhost:3000/hello/world',
    path: '/hello/world',
    title: 'Hello World',
  });
  const allVisits = await getAllVisits();
  response.status(200).json({ message: 'good job', allVisits });
};
