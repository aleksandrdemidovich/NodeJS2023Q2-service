import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const validateId = (id: string) => {
  if (!validate(id)) {
    throw new HttpException(
      'UserId is invalid (not uuid)',
      HttpStatus.BAD_REQUEST,
    );
  }
};
