import {ErrorOther} from 'redux-form';

const FIRST_LETTER = /^\w/;
const TEMPLATE = /^(.+)\s+\((\w+)(->(\w+))?\)$/;
const MESSAGE = 1;
const FIELD = 2;
const SUB_FIELD = 4;

const toLowerCase = (word: string): string => word.replace(
  FIRST_LETTER, ch => ch.toLowerCase()
);

export const parseMessages = <T extends ErrorOther>(messages: string[]) => (
  messages.reduce((prev, message): T => {
    const match = TEMPLATE.exec(message);

    if (!match) return {...prev, _error: message};

    const field = toLowerCase(match[FIELD]) as keyof T;

    if (!match[SUB_FIELD]) return {...prev, [field]: match[MESSAGE]};

    const subField = toLowerCase(match[SUB_FIELD]);

    return {...prev, [field]: {...prev[field], [subField]: match[MESSAGE]}};
  }, {} as T)
);