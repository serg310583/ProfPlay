import { createAsyncThunk } from '@reduxjs/toolkit';
import { awardsApi } from '../../../../api/axios';
import ids from '../../../variables';

export const fetchGetAllAwardsOrg = createAsyncThunk(
  'AllAwardsOrg/getAllAwardsOrg',
  async (thunkAPI) => {
    try {
      const organizationId = ids.project_id ?? '';
      const response = await awardsApi.get('/achievements/', {
        headers: {
          'ORGANIZATION-ID': `${organizationId}`,
          // 'ORGANIZATION-ID': '642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389',
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
