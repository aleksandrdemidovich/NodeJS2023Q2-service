import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/jwt.constants';

export const hashPassword = async (password: string): Promise<string> => {
  const genSalt = await bcrypt.genSalt(jwtConstants.cryptSalt);
  return await bcrypt.hash(password, genSalt);
};
