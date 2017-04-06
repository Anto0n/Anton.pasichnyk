//package com.bionic.baglab.controllers;
//import com.bionic.baglab.dao.UserDao;
//import com.bionic.baglab.domains.UserEntity;
//import com.bionic.baglab.domains.UserRole;
//import com.bionic.baglab.services.CustomUserDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//@RequestMapping("/")
//public class RegisterController {
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//    @Autowired
//    private UserDao userDao;
//    @Autowired
//    private CustomUserDetailsService userDetailsService;
//
//    @RequestMapping(value = "/registration")
//    public String registration(@RequestParam String username,
//                               @RequestParam String password, Model model) {
//        String pass = passwordEncoder.encode(password);
//        UserEntity user = new UserEntity();
//        user.setLogin(username);
//        user.setPassword(pass);
//        user.setEmail("test1"+Math.random());
//        user.setFirstname("test1");
//        user.setLastname("test1");
//        user.setStatusId(1);
//        UserRole role = new UserRole();
//        role.setIdRole(1);
//        user.setRole(role);
//        userDao.save(user);
//
//
//        return "redirect:/";
//    }
//}
