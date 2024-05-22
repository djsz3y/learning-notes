之前的 https 配置：

```nginx
server {
  listen 443 ssl;
  server_name djsz3y.online www.djsz3y.online;
  ssl_certificate /root/ssl/djsz3y.online.pem;
  ssl_certificate_key /root/ssl/djsz3y.online.key;

  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_session_tickets off;

  # 请按照以下协议配置
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  # 请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 

  ssl_prefer_server_ciphers on;
  ssl_dhparam /nginx/dhparam.pem;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options nosniff;
  add_header X-Frame-Options SAMEORIGIN;
  add_header X-XSS-Protection "1; mode=block";
  add_header Referrer-Policy "no-referrer-when-downgrade";

  root   /nginx/dist/;
  index index.html index.htm;

  autoindex on;
  add_header Cache-Control "no-cache, must-revalidate";

  access_log  /usr/local/nginx/logs/access.log  main;

  location / {
      try_files $uri $uri/ =404;
  }

  location /prod-api/ {
    proxy_pass http://39.105.131.75:3004/api/;

    proxy_set_header   Host              $host; # 域名转发
    proxy_set_header   X-Real-IP         $remote_addr; # IP转发
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   Cookie            $http_cookie; # cookie 配置
  }
}
```

## 可以试图修改的配置：

ssl_protocols

```nginx
ssl_protocols TLSv1.2;
ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
```

```nginx

```