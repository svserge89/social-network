export const errorCodeSelector = ({error}) => error.code;

export const errorDescriptionSelector = ({error}) => error.description;

export const isErrorSelector = ({error}) => !!error.code;