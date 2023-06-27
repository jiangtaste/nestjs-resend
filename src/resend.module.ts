import { Module } from '@nestjs/common';
import { RESEND_CONFIGURATION } from './constants';
import { Options, OptionsAsync } from './interface';
import { ResendService } from './resend.service';

@Module({})
export class ResendModule {
  public static forRoot(options: Options) {
    return {
      module: ResendModule,
      providers: [
        { provide: RESEND_CONFIGURATION, useValue: options },
        ResendService,
      ],
      exports: [ResendService],
    };
  }

  public static forAsyncRoot(optionsAsync: OptionsAsync) {
    return {
      module: ResendModule,
      providers: [
        {
          provide: RESEND_CONFIGURATION,
          useFactory: optionsAsync.useFactory,
          inject: optionsAsync.inject || [],
        },
        ResendService,
      ],
      exports: [ResendService],
    };
  }
}
