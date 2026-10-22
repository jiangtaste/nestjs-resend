<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A simple nestjs wrapper of <a href="https://resend.com" target="_blank">Resend</a>. It support send mail only</p>
    <p align="center">
<a href="https://www.npmjs.com/nestjs-resend" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-resend.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/nestjs-resend" target="_blank"><img src="https://img.shields.io/npm/l/nestjs-resend.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/nestjs-resend" target="_blank"><img src="https://img.shields.io/npm/dm/nestjs-resend.svg" alt="NPM Downloads" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Features

1. send email
2. send batch emails

## Installation

Supports NestJS 11 and 12. NestJS 12 packages use ESM; this wrapper can be
used from both CommonJS and ESM applications on Node.js 20.19+ or 22.12+
(Node.js 21 is not supported). Node.js 24 LTS is recommended. See the
[NestJS migration guide](https://docs.nestjs.com/migration-guide).

```bash
# npm
$ npm install nestjs-resend

# yarn
$ yarn add nestjs-resend

# pnpm
$ pnpm add nestjs-resend
```

## Usage

### Importing module

```typescript
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [
    ResendModule.forRoot({
      apiKey: 'your resend api key',
    }),
  ],
  providers: [],
  exports: [],
})
```

### Importing module async

```typescript
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [
    ResendModule.forRootAsync({
      useFactory: async () => ({
        apiKey: 'your resend api key',
      })
    }),
  ],
  providers: [],
  exports: [],
})
```

## Interfaces

```typescript
interface Options {
  apiKey?: string
}
```

When `apiKey` is omitted, the Resend SDK reads `RESEND_API_KEY` from the
environment. If neither is configured, application startup fails with the
SDK's missing API key error.

## Send Email

```typescript
import { ResendService } from 'nestjs-resend';

@Injectable()
export class YourService {
  constructor(private readonly resendService: ResendService) {

    // text
    await this.resendService.send({
      from: 'you@example.com',
      to: 'user@gmail.com',
      subject: 'hello world',
      text: 'it works!',
    });

    // html
    await this.resendService.send({
      from: 'you@example.com',
      to: 'user@gmail.com',
      subject: 'hello world',
      html: '<strong>it works!</strong>',
    });

    // react
    await this.resendService.send({
      from: 'you@example.com',
      to: 'user@gmail.com',
      subject: 'hello world',
      react: <EmailTemplate firstName="John" product="MyApp" />,
    });

    // To include a friendly name, use the format "Your Name <sender@domain.com>"
    await this.resendService.send({
      from: 'Your Name <you@example.com>',
      to: 'user@gmail.com',
      subject: 'hello world',
      react: <EmailTemplate firstName="John" product="MyApp" />,
    });
  }
```

## Send Batch Emails

```typescript
import { ResendService } from 'nestjs-resend';

@Injectable()
export class YourService {
  constructor(private readonly resendService: ResendService) {


    await this.resendService.sendBatch([
      // text
      {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'hello world',
        text: 'it works!',
      },
      // html
      {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'hello world',
        html: '<strong>it works!</strong>',
      },
      // react
      {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'hello world',
        react: <EmailTemplate firstName="John" product="MyApp" />,
      },
      // To include a friendly name, use the format "Your Name <sender@domain.com>"
      {
        from: 'Your Name <you@example.com>',
        to: 'user@gmail.com',
        subject: 'hello world',
        react: <EmailTemplate firstName="John" product="MyApp" />,
      }
    ]);
  }
```

## License

Nestjs-Resend is [MIT licensed](LICENSE).
