package com.ans20xx.newsserver.mapper;


import com.ans20xx.newsserver.DO.TokenDO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenMapper {
    @Insert("insert into token(token_str, token_user, gmt_create)" +
            "values(#{tokenStr}, #{tokenUser}, now())")
    void insert(TokenDO tokenDO);

    @Select("select * from token where token_user=#{id}")
    TokenDO selectTokenByTokenUser(long id);

}
