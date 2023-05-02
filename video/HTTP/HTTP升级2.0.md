# HTTP 升级 2.0

[返回学习笔记目录](/README.md)

## Step1：安装 apr

```bash
wget http://mirrors.tuna.tsinghua.edu.cn/apache//apr/apr-1.7.0.tar.gz
tar xzf apr-1.7.0.tar.gz
./configure
make
make install
```

## Step2：安装 apr-until

```bash
wget http://mirrors.tuna.tsinghua.edu.cn/apache//apr/apr-util-1.6.1.tar.gz
tar xzf apr-util-1.6.1.tar.gz
./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr
Make
# (编译中断。
#   make[1]: *** [xml/apr_xml.lo] 错误 1
#   make[1]: 离开目录“/usr/local/apr-util-1.6.1”
#   make: *** [all-recursive] 错误 1
# 解决方案，下载安装expat库 ：yum install expat-devel
make install
```

## STEP3: 安装 openssl

```bash
Wget https://www.openssl.org/source/openssl-1.1.0l.tar.gz
cd openssl-1.1.0l
./config shared --prefix=/usr/local/openssl-1.1.0l
make depend
make
make install
```

## STEP4： 安装 tomcat native

```bash
cd apache-tomcat-9.0.16/bin
tar -xvf tomcat-native.tar.gz
cd tomcat-native-1.2.21-src/native
./configure --prefix=/usr/local/tomcat-native --with-apr=/usr/local/apr --with-java-home=/usr/java/jdk1.8.0_141 --with-ssl=/usr/local/openssl-1.1.0l
make
make install
```

## STEP5 配置 ld

```bash
vim /etc/profile
export LD_LIBRARY_PATH=/usr/local/tomcat-native/lib:$LD_LIBRARY_PATH
source /etc/profile
```

## STEP6 生成证书

```bash
cd apache-tomcat-9.0.16
mkdir ssl
cd ssl
openssl genrsa -out server.key 2048  
openssl rsa -in server.key -out server.key  
openssl req -new -x509 -key server.key -out ca.crt -days 3650 
```

## STEP7 配置 server.xml

找到 http2 并修改成如下：

```xml
<!--Define a SSL/TLS HTTP/1.1 Connector on port 8443 with HTTP/2
    This connector uses the APR/native implementation which always uses
    OpenSSL for TLS.
    Either JSSE or OpenSSL style configuration may be used. OpenSSL style
    configuration is used below.
-->
<Connector port="8443" protocol="org.apache.coyote.http11.Http11AprProtocol"
           maxThreads="150" SSLEnabled="true" >
    <UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol" />
    <SSLHostConfig>
        <Certificate certificateKeyFile="ssl/server.key"
                  certificateFile="ssl/ca.crt"
                  type="RSA" />
    </SSLHostConfig>
</Connector>
```

重新启动
