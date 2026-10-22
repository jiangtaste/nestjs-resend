import type { DynamicModule } from '@nestjs/common'
import {
  ResendModule,
  ResendService,
  type ResendOptions,
} from '../../dist/index.js'

const options: ResendOptions = { apiKey: 're_test_esm_types' }
const module: DynamicModule = ResendModule.forRoot(options)
const service = new ResendService(options)

void [module, service]
