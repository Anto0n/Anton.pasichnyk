package com.bionic.baglab.dto;

public class JResponse {
    private String responseMessage;

    public JResponse(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public JResponse() {
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }
}
