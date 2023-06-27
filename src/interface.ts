import { ModuleMetadata } from '@nestjs/common';
import {} from 'resend';

export interface Options {
  apiKey: string;
}

export interface OptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Options | Promise<Options>;
  inject?: any[];
}
