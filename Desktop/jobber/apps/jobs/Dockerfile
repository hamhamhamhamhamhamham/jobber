
# STAGE 1-Image 1(BUILDING)
FROM  node:18-slim AS builder 

# COPIED FILED directory
WORKDIR /workspace


# SHARED(in root) between packages and libs
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./ 
COPY eslint.config.mjs ./
COPY webpack.*.config.js ./
# SOURCE CODE
# the app
COPY apps/jobs ./apps/jobs
#  libraries(which inclidung their own package.json) utilized in jobs app
COPY libs/graphql ./libs/graphql
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/pulsar ./libs/pulsar


RUN npm install
# install protoc package : protoc not found inside debian image
RUN apt-get update && apt-get install -y protobuf-compiler
# nx library that installed locally
# complile to JS . app and it's dependent library <automatically distinguished by nx> inside DIST dir
RUN npx nx build jobs







#STAGE 2-Image2  > Utilize 1st Stage + nodejs works by Docker Command

FROM node:18-slim AS runner
WORKDIR /app

# aliases( works with node )
COPY --from=builder /workspace/package.json ./
# app & libs package.json
COPY --from=builder /workspace/apps/jobs/package.json ./apps/jobs/package.json
COPY --from=builder /workspace/libs/graphql/package.json ./libs/graphql/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
# COPY --from=builder /workspace/libs/nestjs/package.json ./libs/nestjs/package.json
# COPY --from=builder /workspace/libs/prisma/package.json ./libs/prisma/package.json
COPY --from=builder /workspace/libs/pulsar/package.json ./libs/pulsar/package.json
# ++
COPY --from=builder /workspace/package-lock.json ./

# only production dependencies and exclude devDependencies
ENV NODE_ENV=production
RUN npm ci 

# compiled JS(the app and libs in js format)
COPY --from=builder /workspace/dist ./dist
CMD ["node","dist/apps/jobs/main"]