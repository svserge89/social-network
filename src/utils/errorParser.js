const FIRST_LETTER = /^\w/;
const TEMPLATE = /^(.+)\s+\((\w+)(->(\w+))?\)$/;
const MESSAGE = 1;
const FIELD = 2;
const SUB_FIELD = 4;

const toLowerCase = (word) => word.replace(FIRST_LETTER, ch => ch.toLowerCase());

export const parseMessages = (messages) => messages.reduce((prev, message) => {
  const match = TEMPLATE.exec(message);

  if (!match) return {...prev, _error: message};

  const field = toLowerCase(match[FIELD]);

  if (!match[SUB_FIELD]) return {...prev, [field]: match[MESSAGE]};

  const subField = toLowerCase(match[SUB_FIELD]);

  return {...prev, [field]: {...prev[field], [subField]: match[MESSAGE]}};
}, {});