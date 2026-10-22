import { Inject, Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateEmailOptions,
  CreateEmailRequestOptions,
} from 'resend'

import { RESEND_CONFIGURATION_OPTIONS } from './resend.constant'
import type { ResendOptions } from './resend.interface'

@Injectable()
export class ResendService extends Resend {
  constructor(
    @Inject(RESEND_CONFIGURATION_OPTIONS)
    readonly options: ResendOptions,
  ) {
    super(options?.apiKey)
  }

  public send = async (
    payload: CreateEmailOptions,
    options?: CreateEmailRequestOptions,
  ) => this.emails.send(payload, options)

  public sendBatch = async (
    payload: CreateBatchOptions,
    options?: CreateBatchRequestOptions,
  ) => this.batch.send(payload, options)
}
