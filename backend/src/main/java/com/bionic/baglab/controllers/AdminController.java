package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.JResponse;
import com.bionic.baglab.dto.user.UserRoleDto;
import com.bionic.baglab.services.UserRoleService;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleService userRoleService;

    @PutMapping("/edituser/{id}")
    public ResponseEntity<JResponse> deleteUser(@PathVariable("id") long id,
                                           @Validated @RequestBody  UserRoleDto roleDto) {
        try {
            UserEntity user = userService.findOne(id);
            user.setRole(userRoleService.findOne(roleDto.getIdRole()));
            userService.save(user);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(new JResponse("succes"), HttpStatus.OK);
    }

}
