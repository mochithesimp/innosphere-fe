import * as request from "../../../utils/request";

/**
 * GET /api/jobposting
 */
export const getJobPostings = async (params: any) => {
  try {
    const res = await request.get('/api/jobposting', { params });
    return res;
  } catch (error) {
    console.error('Error fetching job postings:', error);
    return null;
  }
};

/**
 * GET /api/jobposting/employer/{id}?status=...
 */
export const getJobPostingsByEmployer = async (employerId: number, status?: string) => {
  try {
    const res = await request.get(`/api/jobposting/employer/${employerId}`, {
      params: status ? { status } : {},
    });
    return res;
  } catch (error) {
    console.error('Error fetching employer job postings:', error);
    return null;
  }
};

/**
 * GET /api/jobposting/{id}
 */
export const getJobPostingById = async (id: number) => {
  try {
    const res = await request.get(`/api/jobposting/${id}`);
    return res;
  } catch (error) {
    console.error('Error fetching job posting by ID:', error);
    return null;
  }
};

/**
 * POST /api/jobposting
 */
export const createJobPosting = async (data: any) => {
  try {
    const res = await request.post('/api/jobposting', data);
    return res;
  } catch (error) {
    console.error('Error creating job posting:', error);
    throw error;
  }
};

/**
 * PUT /api/jobposting/{id}/approve
 */
export const approveJobPosting = async (id: number) => {
  try {
    await request.put(`/api/jobposting/${id}/approve`, {});
  } catch (error) {
    console.error('Error approving job posting:', error);
    throw error;
  }
};

/**
 * PUT /api/jobposting/{id}/reject
 */
export const rejectJobPosting = async (id: number) => {
  try {
    await request.put(`/api/jobposting/${id}/reject`, {});
  } catch (error) {
    console.error('Error rejecting job posting:', error);
    throw error;
  }
};

/**
 * PUT /api/jobposting/{id}/close
 */
export const closeJobPosting = async (id: number) => {
  try {
    await request.put(`/api/jobposting/${id}/close`, {});
  } catch (error) {
    console.error('Error closing job posting:', error);
    throw error;
  }
};

/**
 * PUT /api/jobposting/{id}/complete
 */
export const completeJobPosting = async (id: number) => {
  try {
    await request.put(`/api/jobposting/${id}/complete`, {});
  } catch (error) {
    console.error('Error completing job posting:', error);
    throw error;
  }
};
