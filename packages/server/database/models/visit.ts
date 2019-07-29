import { database } from '../knex';

export type Visit = {
  id: string;
  userId: string;
  url: string;
  path: string;
  title: string;
  referrer?: string;
};

const Visit = () => database<Visit>('visit');

export const createVisit = (visit: Omit<Visit, 'id'>) => {
  return Visit().insert(visit);
};

export const getAllVisits = async () =>
  Visit()
    .select()
    .debug(true);
