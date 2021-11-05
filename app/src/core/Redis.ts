import * as ioredis from 'ioredis'

const Redis = new ioredis(
    process.env.FAX_REDIS
        ? String(process.env.FAX_REDIS)
        : "redis://localhost:6379"
)

export default Redis