FROM node:20 AS assets-builder

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install && rm -rf /root/.cache/yarn
COPY webpack.config.js ./
COPY tsconfig.json ./
COPY types ./
COPY sw ./sw
COPY proto ./proto
COPY app/javascript ./app/javascript
RUN NODE_ENV=production node_modules/.bin/webpack

# https://github.com/sorah-rbpkg/dockerfiles
FROM sorah/ruby:3.3-dev-jammy AS builder

RUN rm /etc/apt/sources.list.d/sorah-ruby.list

RUN apt-get update \
    && apt-get install -y libmysqlclient-dev libsodium-dev git-core \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile /app/
COPY Gemfile.lock /app/

RUN bundle install --path /gems --jobs 2 --deployment --without development:test

FROM sorah/ruby:3.3-jammy

RUN rm /etc/apt/sources.list.d/sorah-ruby.list

RUN apt-get update \
    && apt-get install -y libmysqlclient21 libsodium23 libsodium-dev curl unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /gems /gems
COPY --from=builder /app/.bundle /app/.bundle
COPY --from=assets-builder /app/public/packs ./public/packs
COPY --from=assets-builder /app/public/sw.js* ./public/
COPY . /app/

ENV RAILS_LOG_TO_STDOUT=1
ENV RAILS_SERVE_STATIC_FILES=1
ENV RAILS_SERVE_STATIC_FILES_CC="public,max-age=31536000"
ENV PORT=3000
VOLUME [ "/app" ]
CMD ["bundle", "exec", "puma", "-C", "/etc/puma.rb"]
