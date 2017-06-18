package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.services.UserRoleService;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleService userRoleService;

    @PostMapping("editusers/{id}/{roleId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id,
        @PathVariable("roleId") long roleId) {
        try {
            UserEntity user = userService.findOne(id);
            user.setRole(userRoleService.findOne(roleId));
            userService.save(user);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
