FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY .. /app

RUN apk add --no-cache maven

RUN mvn clean install -Dmaven.test.skip=true

EXPOSE 8080

CMD ["java", "-jar", "./target/Management-Board-API-0.0.1-SNAPSHOT.jar"]
