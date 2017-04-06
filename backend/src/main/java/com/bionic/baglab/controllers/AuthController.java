package com.bionic.baglab.controllers;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

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
}
