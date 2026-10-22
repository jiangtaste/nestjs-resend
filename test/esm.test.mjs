import 'reflect-metadata'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NestFactory } from '@nestjs/core'
import { Resend, ResendModule, ResendService } from '../dist/index.js'

test('ESM consumers can import named exports and start a Nest application', async (t) => {
  class AppModule {}
  const app = await NestFactory.createApplicationContext(
    {
      module: AppModule,
      imports: [ResendModule.forRoot({ apiKey: 're_test_esm' })],
    },
    { logger: false, abortOnError: false },
  )
  t.after(() => app.close())

  const service = app.get(ResendService)
  assert.ok(service instanceof Resend)
  assert.equal(service.key, 're_test_esm')
})
