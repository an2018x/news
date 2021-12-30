package com.ans20xx.newsserver.mapper;


import com.ans20xx.newsserver.DO.UserDO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    @Insert("insert into user(user_name, user_password, user_role, gmt_create, user_avatar)" +
            "values(#{userName}, #{userPassword}, #{userRole}, now(), #{userAvatar})")
    @Options(useGeneratedKeys = true, keyProperty = "userId", keyColumn = "user_id")
    void insert(UserDO user);

    @Select("select * from user where user_id=#{id}")
    UserDO selectUserById(long id);

    @Select("select * from user where user_name=#{name}")
    UserDO selectUserByName(String name);

    @Select("select count(*) from user")
    int selectTotal();

    @Select("select * from user")
    List<UserDO> selectAll();
}
