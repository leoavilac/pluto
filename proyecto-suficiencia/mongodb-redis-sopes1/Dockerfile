# Base image
FROM node:16.3.0

# Base directory
WORKDIR /app

# Copy package.json in current directory
COPY package.json .

# Install all dependencies
# RUN npm install
# Install all dependencies in production or development
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy all files in current directory
COPY . ./

# Enviromental variables
ENV PORT 3001
EXPOSE $PORT

# Port
EXPOSE 3001

# Run project
CMD ["node", "index.js"]
