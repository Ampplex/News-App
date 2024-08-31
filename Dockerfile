FROM node

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs


COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install



EXPOSE 8080

# Copies all the files
COPY . .


ENTRYPOINT [ "node", "app.js" ]