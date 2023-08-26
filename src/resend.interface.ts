import { ModuleMetadata } from '@nestjs/common'

export interface ResendOptions {
  apiKey: string
}

export interface ResendOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useFactory: (...args: any[]) => ResendOptions | Promise<ResendOptions>
  inject?: any[]
}
