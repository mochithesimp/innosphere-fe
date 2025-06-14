import * as request from "../../../utils/request";

/**
 * GET /api/city
 * Lấy tất cả City (bao gồm đã xóa mềm)
 */
export const getAllCities = async () => {
  try {
    const res = await request.get('/api/city');
    return res;
  } catch (error) {
    console.error('Error fetching all cities:', error);
    return [];
  }
};

/**
 * GET /api/city/active
 * Lấy City chưa xóa mềm
 */
export const getActiveCities = async () => {
  try {
    const res = await request.get('/api/city/active');
    return res;
  } catch (error) {
    console.error('Error fetching active cities:', error);
    return [];
  }
};

/**
 * GET /api/city/{id}
 */
export const getCityById = async (id: number) => {
  try {
    const res = await request.get(`/api/city/${id}`);
    return res;
  } catch (error) {
    console.error('Error fetching city by ID:', error);
    return null;
  }
};

/**
 * POST /api/city
 */
export const createCity = async (data: any) => {
  try {
    const res = await request.post('/api/city', data);
    return res;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

/**
 * PUT /api/city/{id}
 */
export const updateCity = async (id: number, data: any) => {
  try {
    const res = await request.put(`/api/city/${id}`, data);
    return res;
  } catch (error) {
    console.error('Error updating city:', error);
    throw error;
  }
};

/**
 * DELETE /api/city/{id}
 * Xóa mềm
 */
export const softDeleteCity = async (id: number) => {
  try {
    await request.deleteData(`/api/city/${id}`);
  } catch (error) {
    console.error('Error soft deleting city:', error);
    throw error;
  }
};

/**
 * PATCH /api/city/{id}/restore
 */
export const restoreCity = async (id: number) => {
  try {
    return await request.patch(`/api/city/${id}/restore`);
  } catch (error) {
    console.error('Error restoring city:', error);
    throw error;
  }
};

/**
 * DELETE /api/city/{id}/hard
 * Xóa cứng
 */
export const hardDeleteCity = async (id: number) => {
  try {
    await request.deleteData(`/api/city/${id}/hard`);
  } catch (error) {
    console.error('Error hard deleting city:', error);
    throw error;
  }
};
