import {ChangeEvent, useCallback, useState} from 'react';

export const useInput = <
  TargetType extends HTMLInputElement | HTMLTextAreaElement
>() => {
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((event: ChangeEvent<TargetType>) => {
    setValue(event.target.value);
  }, []);

  return {
    value,
    setValue,
    onChange,
  };
};
