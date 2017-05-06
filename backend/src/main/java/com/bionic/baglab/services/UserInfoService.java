package com.bionic.baglab.services;

import com.bionic.baglab.domains.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * Created by Potaychuk Sviatoslav on 05.05.2017.
 */
@Service
public class UserInfoService {

    @Autowired
    UserService userService;

    public UserEntity getLoggedUser(){
        //// TODO: 06.05.2017 Enable security and rewrite code below 
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        Object principal = authentication.getPrincipal();
        String s = String.valueOf(principal);
        String login = ((UserDetails)(SecurityContextHolder.
                getContext().
                getAuthentication().
                getPrincipal())).
                getUsername();
        return userService.findByLogin(login);
    }

}
