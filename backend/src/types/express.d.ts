import { UserResponse } from './index.js';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
