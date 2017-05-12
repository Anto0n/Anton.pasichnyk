package com.bionic.baglab.controllers;
import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.domains.UserRole;
import com.bionic.baglab.dto.user.UserDtoRegistration;
import com.bionic.baglab.services.CustomUserDetailsService;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;


    /**
     * --> Create a new user and save it in the database.
     * encript password
     * @param userDtoRegistration
     * @return A string describing if the user is succesitfully created or not.
     */
    @PostMapping(value = "/registration")
    public ResponseEntity<Void> registration(@Validated @RequestBody UserDtoRegistration userDtoRegistration) {
        String email = userDtoRegistration.getEmail();
        if (userService.isUserExistByEmail(email)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); //" User with name " + userDto.getIdUser() + " already exist"
        }
        String encPass = passwordEncoder.encode(userDtoRegistration.getPassword());
        System.out.println("encr password: "+ encPass);
        userDtoRegistration.setPassword(encPass);
        boolean created = userService.createUser(userDtoRegistration);
        if(!created)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }
}


/*
* @PostMapping(value = "/api/user/create")
  public  ResponseEntity<Void> createUser(@Validated @RequestBody UserDtoRegistration userDtoRegistration) { //,  UriComponentsBuilder ucBuilder)
    String email = userDtoRegistration.getEmail();
    if (userService.isUserExistByEmail(email)) {
      return new ResponseEntity<>(HttpStatus.CONFLICT); //"A User with name " + userDto.getIdUser() + " already exist"
    }
   Boolean created;
   created = userService.createUser(userDtoRegistration);
   if(!created)
     return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.CREATED);

* */