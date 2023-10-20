import { ValidationArguments } from 'class-validator';

export const lengthError = (value: number, isMin = true) => {
  let lengthMessage = `should be greater than ${value}`;
  if (!isMin) lengthMessage = `should be less than ${value}`;

  return (validationArguments: ValidationArguments) => {
    return `${validationArguments.targetName} ${lengthMessage}`;
  };
};
