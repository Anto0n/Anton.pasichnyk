package com.bionic.baglab.services;

import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

    @Autowired
    public CustomUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserEntity user = userDao.findByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("No user present with username: " + login);
        }

        List<GrantedAuthority> roles = Arrays.asList(new SimpleGrantedAuthority(user.getRole().getName()));
        return new User(user.getLogin(), user.getPassword(), roles);
    }
}
