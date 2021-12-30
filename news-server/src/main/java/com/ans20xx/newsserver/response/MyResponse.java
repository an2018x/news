package com.ans20xx.newsserver.response;


import lombok.Data;

@Data
public class MyResponse {

    private int code;
    private String info;
    private Object data;

    public MyResponse(int code, String info, Object data) {
        this.code = code;
        this.info = info;
        this.data = data;
    }

    public static MyResponse getSuccess(Object data) {
        return new MyResponse(200, "success", data);
    }

    public static MyResponse getError(String info) {
        return new MyResponse(201, info, null);
    }


}