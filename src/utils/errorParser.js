const IN_BRACKETS = /\([^)]*\)/g;
const BRACKETS = /[(,)]/g;
const SPLIT = '->';
const FIRST_LETTER = /^\w/;

const toLowerCase = (word) => word.replace(FIRST_LETTER, ch => ch.toLowerCase());

const getFieldNames = (message) => message.match(IN_BRACKETS);

const getErrorString = (message, fieldName) => (
  message.slice(0, message.length - fieldName.length - 1)
);

const getKeys = (fieldName) => fieldName.replace(BRACKETS, '').split(SPLIT).map(toLowerCase);

const getPair = (prev, keys, message) => (
  keys.length === 1
    ? {...prev, [keys[0]]: message}
    : {...prev, [keys[0]]: getPair(prev[keys[0]], keys.slice(1), message)}
);

export const parseMessages = (messages) => messages.reduce((prev, message) => {
  const fieldNames = getFieldNames(message);

  if (!fieldNames) return {...prev, _error: message};

  return getPair(prev, getKeys(fieldNames[0]), getErrorString(message, fieldNames[0]));
}, {});