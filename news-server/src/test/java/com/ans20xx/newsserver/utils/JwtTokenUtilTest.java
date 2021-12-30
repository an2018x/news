package com.ans20xx.newsserver.utils;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class JwtTokenUtilTest {

    @Resource
    JwtTokenUtil jwtTokenUtil;

    @Test
    public void testGenerateToken() {
        String str = "test";
        System.out.println(jwtTokenUtil.generateToken(str));
        Assert.assertNotNull(jwtTokenUtil.generateToken(str));
    }
}
