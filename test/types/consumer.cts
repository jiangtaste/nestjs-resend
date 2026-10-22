import type { DynamicModule } from '@nestjs/common'
import {
  ResendModule,
  ResendService,
  type CreateBatchRequestOptions,
  type ResendOptions,
  type ResendOptionsAsync,
} from '../../dist/index.js'

const options: ResendOptions = { apiKey: 're_test_types' }
const asyncOptions: ResendOptionsAsync = {
  inject: [{ token: 'API_KEY', optional: true }],
  useFactory: async (apiKey?: string) => ({
    apiKey: apiKey ?? options.apiKey,
  }),
}
const syncModule: DynamicModule = ResendModule.forRoot(options)
const asyncModule: DynamicModule = ResendModule.forRootAsync(asyncOptions)
const batchOptions: CreateBatchRequestOptions = {
  idempotencyKey: 'batch-types',
}
const service = new ResendService(options)
const sendBatch: (
  ...args: Parameters<ResendService['batch']['send']>
) => ReturnType<ResendService['batch']['send']> = service.sendBatch

void [syncModule, asyncModule, batchOptions, sendBatch]
