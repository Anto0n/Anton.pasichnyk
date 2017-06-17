package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserService userService;




}
