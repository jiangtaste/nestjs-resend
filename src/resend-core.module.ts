import { Global, Module, DynamicModule } from '@nestjs/common'
import { ResendService } from './resend.service'
import { ResendOptions, ResendOptionsAsync } from './resend.interface'
import { RESEND_CONFIGURATION_OPTIONS } from './resend.constant'

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
