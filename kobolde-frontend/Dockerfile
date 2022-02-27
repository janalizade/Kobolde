FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
RUN npm install --save react-hook-form
RUN npm install --save @material-ui/icons
RUN npm install --save @material-ui/core 
RUN npm install --save bootstrap
RUN npm install --save react-chartjs-2 chart.js
RUN npm install --save blob-util
RUN npm install --save react-image-file-resizer
RUN npm install --save semantic-ui-react 
RUN npm install --save sweetalert2
RUN npm install --save react-scripts@3.4.1 -g

COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
