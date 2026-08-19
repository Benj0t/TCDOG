FROM node:24.19.0

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Copy package files and install dependencies

COPY . .
RUN npm cache clean --force && npm install

# Copy the rest of the application files
# Expose the application port
EXPOSE 3000

RUN npm run typecheck
# Use entrypoint for flexibility
ENTRYPOINT ["npm", "run", "start"]
