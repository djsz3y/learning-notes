# Linux 下 Tocat 维护

[返回学习笔记目录](/README.md)

## Step1：

### 安装 JDK1.8

1. 创建目录并进入`mkdir /usr/java`
2. 下载 jdk:
   ```bash
   wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u141-b15/336fa29ff2bb4ef291e347e091f7f4a7/jdk-8u141-linux-x64.tar.gz"
   ```
3. 解压缩: `tar xzf jdk-8u141-linux-x64.tar.gz`
4. 设置环境变量：`vi /etc/profile`

### 添加：

```bash
#set java environment
JAVA_HOME=/usr/java/jdk1.8.0_141
JRE_HOME=/usr/java/jdk1.8.0_141/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH
```

### 让修改生效`source /etc/profile`

### 测试安装`java –version`

## STEP2 ： tomcat 安装

1. 下载 wget " http://mirrors.hust.edu.cn/apache/tomcat/tomcat-9/v9.0.16/bin/apache-tomcat-9.0.16.tar.gz"
2. 解压缩后即可使用

将 testHttp.war 拷贝到对应 linux 下 tomcat 中 webapp 文件夹中，在 bin 下启动./startup.sh
启动成功即可访问
