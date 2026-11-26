import z from 'zod';

export const uuidParamSchema = z.uuid({ error: 'Incorrect uuid' });
