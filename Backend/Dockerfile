# Use Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR file into the image
ARG JAR_FILE=target/Backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Expose the port used by Spring Boot
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
