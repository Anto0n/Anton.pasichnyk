package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.user.UserDtoLogin;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
   @Autowired
   UserDetailsService service;

    @PostMapping(value="/login")
    public String loginPage(@Validated @RequestBody UserDtoLogin userDtoLogin){
        String username = userDtoLogin.getLogin();
        String password = userDtoLogin.getPassword();
            if (service.loadUserByUsername(username).getPassword().equals(password)){
                 String str = new Gson().toJson(service.loadUserByUsername(username).getAuthorities()).toString();
                 return  str;
            }
        return "404";
    }
}

/*
@RestController("/auth")
public class AuthController {
    @Autowired
    UserDetailsService service;

    @RequestMapping(value="/login", method = RequestMethod.GET)
    public String loginPage(@RequestParam String username, @RequestParam String password){
        if (service.loadUserByUsername(username).getPassword().equals(password)){
            return  new Gson().toJson(service.loadUserByUsername(username).getAuthorities()).toString();}
        return "404";
    }
}*/
