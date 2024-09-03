import { Module } from '@nestjs/common'
import { ResendCoreModule } from './resend-core.module'
import { ResendOptions, ResendOptionsAsync } from './resend.interface'

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
