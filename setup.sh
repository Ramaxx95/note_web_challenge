#!/bin/bash

set -e

echo "Starting project setup..."
echo "Updating apt..."

#sudo apt update -y
#sudo apt upgrade -y

echo "Installing Java 21..."
sudo apt install -y openjdk-21-jdk
java -version

echo "Installing MySQL..."
sudo apt install -y mysql-server mysql-client-core-8.0

echo "Configuring MySQL..."
sudo systemctl start mysql
sudo systemctl enable mysql

if sudo mysql -e "SELECT 1;" >/dev/null 2>&1; then
  echo "Connected to MySQL without password..."
  MYSQL_CMD="sudo mysql"
else
  echo "MySQL requires password..."
  MYSQL_CMD="mysql -u root -proot"
fi

$MYSQL_CMD <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS note_db;
EOF

echo "MySQL configured"
echo "   - user: root"
echo "   - password: root"
echo "   - database: note_db"

echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v

echo "Installing Gradle 8.6..."
wget https://services.gradle.org/distributions/gradle-8.6-bin.zip -P /tmp
sudo unzip -d /opt/gradle /tmp/gradle-8.6-bin.zip
sudo ln -sf /opt/gradle/gradle-8.6/bin/gradle /usr/bin/gradle
gradle -v

echo "Building backend..."
cd backend
./gradlew clean build

echo "Starting backend..."
./gradlew bootRun &
BACKEND_PID=$!
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Starting frontend..."
npm start &
FRONTEND_PID=$!
cd ..

echo "Project is running correctly..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

wait
