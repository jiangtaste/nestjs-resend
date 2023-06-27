import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import {
  CreateEmailOptions,
  CreateEmailRequestOptions,
} from 'resend/build/src/emails/interfaces';
import { RESEND_CONFIGURATION } from './constants';
import { Options } from './interface';

@Injectable()
export class ResendService {
  private readonly resend: Resend;

  constructor(
    @Inject(RESEND_CONFIGURATION)
    readonly configuration: Options,
  ) {
    this.resend = new Resend(configuration.apiKey);
  }

  // public
  public send = async (
    payload: CreateEmailOptions,
    options?: CreateEmailRequestOptions,
  ) => this.resend.emails.send(payload, options);
}
