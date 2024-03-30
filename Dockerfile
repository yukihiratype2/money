FROM dockerproxy.com/denoland/deno:debian-1.42.0

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV CONFIGPATH="/config"

VOLUME /config

WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN deno task build
EXPOSE 8000

CMD ["run", "-A", "main.ts"]