package com.detrans.security.service;

import java.io.Serializable;

public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;
    private final String currentUserName;

    public JwtAuthenticationResponse(String token, String currentUserName) {
        this.token = token;
        this.currentUserName = currentUserName;
    }

    public String getToken() {
        return this.token;
    }

    public String getCurrentUserName() {
        return this.currentUserName;
    }
}
