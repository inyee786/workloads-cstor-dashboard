FROM nginx:1.13
COPY  dist/workloads-dashboard/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
