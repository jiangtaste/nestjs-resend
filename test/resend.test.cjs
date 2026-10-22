require('reflect-metadata')

const assert = require('node:assert/strict')
const { test } = require('node:test')
const { Module } = require('@nestjs/common')
const { Test } = require('@nestjs/testing')
const { Resend, ResendModule, ResendService } = require('../dist/index.js')

async function compile(t, imports) {
  const module = await Test.createTestingModule({ imports }).compile()
  t.after(() => module.close())
  return module
}

function setApiKey(t, value) {
  const previous = process.env.RESEND_API_KEY
  if (value === undefined) delete process.env.RESEND_API_KEY
  else process.env.RESEND_API_KEY = value
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = previous
  })
}

test('forRoot registers an injectable Resend SDK client', async (t) => {
  const options = { apiKey: 're_test_sync' }
  const module = await compile(t, [ResendModule.forRoot(options)])
  const service = module.get(ResendService)

  assert.ok(service instanceof Resend)
  assert.equal(service.options, options)
  assert.equal(service.key, options.apiKey)
})

test('the service is available in sibling modules through global registration', async (t) => {
  class FeatureModule {}
  Module({
    providers: [
      {
        provide: 'FEATURE_RESEND',
        useFactory: (service) => service,
        inject: [ResendService],
      },
    ],
  })(FeatureModule)

  const module = await compile(t, [
    ResendModule.forRoot({ apiKey: 're_test_global' }),
    FeatureModule,
  ])

  assert.equal(module.get('FEATURE_RESEND'), module.get(ResendService))
})

test('forRootAsync awaits configuration from an imported provider', async (t) => {
  const apiKeyToken = Symbol('API_KEY')
  class ConfigurationModule {}
  Module({
    providers: [{ provide: apiKeyToken, useValue: 're_test_async' }],
    exports: [apiKeyToken],
  })(ConfigurationModule)
  const useFactory = t.mock.fn(async (apiKey) => ({ apiKey }))

  const module = await compile(t, [
    ResendModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [apiKeyToken],
      useFactory,
    }),
  ])

  assert.equal(module.get(ResendService).key, 're_test_async')
  assert.equal(useFactory.mock.callCount(), 1)
  assert.deepEqual(useFactory.mock.calls[0].arguments, ['re_test_async'])
})

test('forRootAsync accepts optional factory dependencies', async (t) => {
  const module = await compile(t, [
    ResendModule.forRootAsync({
      inject: [{ token: 'OPTIONAL_API_KEY', optional: true }],
      useFactory: (apiKey) => ({ apiKey: apiKey ?? 're_test_optional' }),
    }),
  ])

  assert.equal(module.get(ResendService).key, 're_test_optional')
})

test('forRootAsync also accepts a factory without dependencies', async (t) => {
  const module = await compile(t, [
    ResendModule.forRootAsync({
      useFactory: () => ({ apiKey: 're_test_factory' }),
    }),
  ])

  assert.equal(module.get(ResendService).key, 're_test_factory')
})

test('an omitted API key falls back to RESEND_API_KEY', async (t) => {
  setApiKey(t, 're_test_environment')
  const module = await compile(t, [ResendModule.forRoot({})])

  assert.equal(module.get(ResendService).key, 're_test_environment')
})

test('missing API keys report the SDK configuration error', async (t) => {
  setApiKey(t, undefined)

  await assert.rejects(
    Test.createTestingModule({
      imports: [ResendModule.forRoot({})],
    }).compile(),
    /Missing API key/,
  )
})

test('send forwards the payload and request options to the SDK', async (t) => {
  const service = new ResendService({ apiKey: 're_test_send' })
  const payload = {
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Test',
    text: 'Test email',
  }
  const options = { idempotencyKey: 'send-test' }
  const response = { data: { id: 'email-id' }, error: null }
  const send = t.mock.method(service.emails, 'send', async () => response)

  assert.equal(await service.send(payload, options), response)
  assert.deepEqual(send.mock.calls[0].arguments, [payload, options])
})

test('sendBatch forwards batch payloads and request options to the SDK', async (t) => {
  const service = new ResendService({ apiKey: 're_test_batch' })
  const payload = [
    {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test',
      text: 'Test batch email',
    },
  ]
  const options = { idempotencyKey: 'batch-test' }
  const response = { data: { data: [{ id: 'email-id' }] }, error: null }
  const send = t.mock.method(service.batch, 'send', async () => response)

  assert.equal(await service.sendBatch(payload, options), response)
  assert.deepEqual(send.mock.calls[0].arguments, [payload, options])
})
