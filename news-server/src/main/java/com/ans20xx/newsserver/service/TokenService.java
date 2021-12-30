package com.ans20xx.newsserver.service;

import com.ans20xx.newsserver.DO.TokenDO;
import com.ans20xx.newsserver.mapper.TokenMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TokenService {

    @Resource
    private TokenMapper tokenMapper;

    public TokenDO create(String token, Long userId) {
        TokenDO tokenDO = new TokenDO();
        tokenDO.setTokenStr(token);
        tokenDO.setTokenUser(userId);
        tokenMapper.insert(tokenDO);
        return tokenDO;
    }

}
