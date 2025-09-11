import apiInstance from './api-instance';

export const getAllSheets = async () => {
  const res = await apiInstance.get('/sheet');
  return res.data ?? [];
};

export const getDataSheet = async (sheet: string) => {
  const res = await apiInstance.post('/sheet', { sheet });
  return res.data ?? [];
};
