import {RootState} from '../store/types';

export const selectInitialized = ({init}: RootState): boolean => init.initialized;