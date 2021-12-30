package com.ans20xx.newsserver.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class TestImageConfig {

    @Resource
    private ImageConfig imageConfig;

    @Test
    public void testGetUrl() {
        System.out.println(imageConfig.getUrl());
    }
}
