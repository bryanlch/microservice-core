import { NestJSReferenceConfiguration } from '@scalar/nestjs-api-reference';

export const scalarConfig: NestJSReferenceConfiguration = {
  theme: 'purple', // 'purple' | 'moon' | 'solarized' | 'none'
  layout: 'modern', // 'modern' | 'classic'
  darkMode: true,
  hideDownloadButton: true,
  hideModels: false,
  searchHotKey: 'k',
};
