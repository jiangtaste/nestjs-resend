import { Global, Module } from '@nestjs/common'
import type { DynamicModule } from '@nestjs/common'
import { RESEND_CONFIGURATION_OPTIONS } from './resend.constant'
import type { ResendOptions, ResendOptionsAsync } from './resend.interface'
import { ResendService } from './resend.service'

@Global()
@Module({
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendCoreModule {
  static forRoot(options: ResendOptions): DynamicModule {
    const resendModuleOptions = {
      provide: RESEND_CONFIGURATION_OPTIONS,
      useValue: options,
    }

    return {
      module: ResendCoreModule,
      providers: [resendModuleOptions],
      exports: [ResendService],
    }
  }

  static forRootAsync(options: ResendOptionsAsync): DynamicModule {
    const resendModuleOptions = {
      provide: RESEND_CONFIGURATION_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }

    return {
      module: ResendCoreModule,
      imports: options.imports,
      providers: [resendModuleOptions],
      exports: [ResendService],
    }
  }
}
