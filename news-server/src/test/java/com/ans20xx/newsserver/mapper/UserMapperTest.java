package com.ans20xx.newsserver.mapper;


import com.ans20xx.newsserver.DO.UserDO;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Random;


@SpringBootTest
public class UserMapperTest {

    @Resource
    private UserMapper userMapper;

    @Test
    public void testInsert() {
        UserDO userDO = new UserDO();
        userDO.setUserName("test" + new Random().nextInt());
        userDO.setUserPassword("1234");
        userDO.setUserRole("admin");
        userMapper.insert(userDO);
    }

    @Test
    public void testSelectUserById() {
        UserDO userDO = userMapper.selectUserById(1);
        Assert.assertEquals("test1", userDO.getUserName());
    }

    @Test
    public void testSelectTotal() {
        int num = userMapper.selectTotal();
        System.out.println(num);
    }


}
