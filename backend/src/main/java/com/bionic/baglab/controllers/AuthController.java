package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.dto.user.UserDtoLogin;
import com.bionic.baglab.services.UserService;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    UserDetailsService service;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserService dtoService;

    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> loginPage(@Validated @RequestBody UserDtoLogin userDtoLogin) {
        String inUsername = userDtoLogin.getLogin();
        String rawPassword = userDtoLogin.getPassword();
        String encPassword = service.loadUserByUsername(inUsername).getPassword();
        if (passwordEncoder.matches(rawPassword, encPassword)) {
            UserDto user = null;
            //  String str = new Gson().toJson(service.loadUserByUsername(username).getAuthorities()).toString();
            try {
                user = dtoService.getUserByEmail(inUsername);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
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
