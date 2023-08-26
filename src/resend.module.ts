import { Module } from '@nestjs/common'
import { ResendOptions, ResendOptionsAsync } from './resend.interface'
import { ResendCoreModule } from './resend-core.module'

@Module({})
export class ResendModule {
  static forRoot(options: ResendOptions) {
    return {
      module: ResendModule,
      imports: [ResendCoreModule.forRoot(options)],
    }
  }

  static forRootAsync(options: ResendOptionsAsync) {
    return {
      module: ResendModule,
      imports: [ResendCoreModule.forRootAsync(options)],
    }
  }
}
