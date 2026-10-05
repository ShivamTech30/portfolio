import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API call with a delay
const mockSubmitForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Form submitted successfully' });
    }, 1500);
  });
};

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await mockSubmitForm(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit form');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    formData: null
  },
  reducers: {
    resetFormStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetFormStatus } = contactSlice.actions;
export default contactSlice.reducer;