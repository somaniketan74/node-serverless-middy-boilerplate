import middyMiddlewareWarmup from 'middy-middleware-warmup';
import middy from 'middy';
import { jsonBodyParser, cors, httpEventNormalizer, doNotWaitForEmptyEventLoop } from 'middy/middlewares';
import { MIDDLEWARE_DEF_CONFIG } from './constant';
import { proxyResponse } from './proxyResponse';
import { passthroughAll } from './passthroughall';
import { dbConnector } from './dbConnector';
import { validateInput } from './validateInputs';
import { auth } from './auth';

export const combineMiddyFactory = (lambda, validationSchema, shouldConnectDB) =>
  middy(lambda)
    .use(middyMiddlewareWarmup())
    .use(httpEventNormalizer())
    .use(jsonBodyParser())
    .use(doNotWaitForEmptyEventLoop(MIDDLEWARE_DEF_CONFIG.DO_NOT_WAIT_FOR_EMPTY_EVENT_LOOP))
    .use(cors(MIDDLEWARE_DEF_CONFIG.CORS))
    .use(validationSchema ? validateInput(validationSchema) : passthroughAll())
    .use(shouldConnectDB ? dbConnector() : passthroughAll())
    .use(auth())
    .use(proxyResponse());
