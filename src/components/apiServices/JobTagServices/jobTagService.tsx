import * as request from "../../../utils/request";

/**
 * GET /api/jobtag
 */
export const getAllJobTags = async () => {
  try {
    const res = await request.get('/api/jobtag');
    return res;
  } catch (error) {
    console.error('Error fetching all job tags:', error);
    return [];
  }
};

/**
 * GET /api/jobtag/active
 */
export const getActiveJobTags = async () => {
  try {
    const res = await request.get('/api/jobtag/active');
    return res;
  } catch (error) {
    console.error('Error fetching active job tags:', error);
    return [];
  }
};

/**
 * GET /api/jobtag/{id}
 */
export const getJobTagById = async (id: number) => {
  try {
    const res = await request.get(`/api/jobtag/${id}`);
    return res;
  } catch (error) {
    console.error('Error fetching job tag by ID:', error);
    return null;
  }
};

/**
 * POST /api/jobtag
 */
export const createJobTag = async (data: any) => {
  try {
    const res = await request.post('/api/jobtag', data);
    return res;
  } catch (error) {
    console.error('Error creating job tag:', error);
    throw error;
  }
};

/**
 * PUT /api/jobtag/{id}
 */
export const updateJobTag = async (id: number, data: any) => {
  try {
    const res = await request.put(`/api/jobtag/${id}`, data);
    return res;
  } catch (error) {
    console.error('Error updating job tag:', error);
    throw error;
  }
};

/**
 * DELETE /api/jobtag/{id}
 * Xóa mềm
 */
export const softDeleteJobTag = async (id: number) => {
  try {
    await request.deleteData(`/api/jobtag/${id}`);
  } catch (error) {
    console.error('Error soft deleting job tag:', error);
    throw error;
  }
};

/**
 * PATCH /api/jobtag/{id}/restore
 */
export const restoreJobTag = async (id: number) => {
  try {
    return await request.patch(`/api/jobtag/${id}/restore`);
  } catch (error) {
    console.error('Error restoring job tag:', error);
    throw error;
  }
};

/**
 * DELETE /api/jobtag/{id}/hard
 * Xóa cứng
 */
export const hardDeleteJobTag = async (id: number) => {
  try {
    await request.deleteData(`/api/jobtag/${id}/hard`);
  } catch (error) {
    console.error('Error hard deleting job tag:', error);
    throw error;
  }
};
