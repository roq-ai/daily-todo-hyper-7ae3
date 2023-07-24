import axios from 'axios';
import queryString from 'query-string';
import { RerollInterface, RerollGetQueryInterface } from 'interfaces/reroll';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRerolls = async (query?: RerollGetQueryInterface): Promise<PaginatedInterface<RerollInterface>> => {
  const response = await axios.get('/api/rerolls', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createReroll = async (reroll: RerollInterface) => {
  const response = await axios.post('/api/rerolls', reroll);
  return response.data;
};

export const updateRerollById = async (id: string, reroll: RerollInterface) => {
  const response = await axios.put(`/api/rerolls/${id}`, reroll);
  return response.data;
};

export const getRerollById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rerolls/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRerollById = async (id: string) => {
  const response = await axios.delete(`/api/rerolls/${id}`);
  return response.data;
};
