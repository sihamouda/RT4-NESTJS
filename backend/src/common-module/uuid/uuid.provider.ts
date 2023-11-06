import { v4 as uuidv4 } from 'uuid';

const uuidGenerator = () => uuidv4();

export const UUID_PROVIDER = {
  provide: 'UUID_PROVIDER',
  useValue: uuidGenerator,
};
