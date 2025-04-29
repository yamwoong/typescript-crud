import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment variables configuration
 */

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const config = {
    get isDev() {
      return NODE_ENV === 'development';
    },
    get isTest() {
      return NODE_ENV === 'test';
    },
    get isProd() {
      return NODE_ENV === 'production';
    }
  };
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ts-crud';
 