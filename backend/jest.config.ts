// jest.config.ts
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths || {},
    { prefix: '<rootDir>/src/' } // ajusta si tu baseUrl es `./src`
  ),
  moduleDirectories: ['node_modules', 'src'], // para que resuelva tus imports
  testMatch: ['**/test/**/*.test.ts'],
  transformIgnorePatterns: ['node_modules/(?!.*)'],
};
