FROM node:22-alpine AS builder

WORKDIR /app
COPY server.js ./

FROM alpine:3.22 AS runtime

RUN apk add --no-cache libstdc++ \
    && addgroup -S node \
    && adduser -S node -G node \
    && mkdir -p /app \
    && chown node:node /app

COPY --from=builder /usr/local/bin/node /usr/local/bin/node
COPY --from=builder /usr/local/lib/libnode.so* /usr/local/lib/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

WORKDIR /app
COPY --from=builder --chown=node:node /app/server.js ./server.js

USER node

EXPOSE 3000
CMD ["node", "server.js"]