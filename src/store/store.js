import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './features/tableData';

export default configureStore({
  reducer: {
    tableData: tableDataReducer
  },
})