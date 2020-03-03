import {RootState} from '../store/types';

export const selectErrorCode = ({error}: RootState): number => error.code;

export const selectErrorDescription = ({error}: RootState): string | null => error.description;

export const selectIsError = ({error}: RootState): boolean => !!error.code;