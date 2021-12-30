package com.ans20xx.newsserver.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(value = "ansimg")
public class ImageConfig {
    private String url;
}
