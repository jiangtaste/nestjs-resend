import { Module } from '@nestjs/common'
import type { DynamicModule } from '@nestjs/common'
import { ResendCoreModule } from './resend-core.module'
import type { ResendOptions, ResendOptionsAsync } from './resend.interface'

@Module({})
export class ResendModule {
  static forRoot(options: ResendOptions): DynamicModule {
    return {
      module: ResendModule,
      imports: [ResendCoreModule.forRoot(options)],
    }
  }

  static forRootAsync(options: ResendOptionsAsync): DynamicModule {
    return {
      module: ResendModule,
      imports: [ResendCoreModule.forRootAsync(options)],
    }
  }
}
