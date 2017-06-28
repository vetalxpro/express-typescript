import { configCommon } from './config.common';
import { configProduction } from './config.production';
import { configTest } from './config.test';
import { merge } from 'lodash';


const env = process.env.NODE_ENV || 'development';

let config;

switch ( env ) {
  case 'production':
    config = merge(configCommon, configProduction);
    break;
  case 'test':
    config = merge(configCommon, configTest);
    break;
  default:
    config = configCommon;
}

export { config };
