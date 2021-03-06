package com.bionic.baglab.controllers;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.SendMailFromUserDto;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.dto.user.UserRoleDto;
import com.bionic.baglab.mail.MailSender;
import com.bionic.baglab.mail.template.TemplateEngine;
import com.bionic.baglab.services.UserRoleService;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;


/**
 * The class to interact with  MySQL database using e UserDto. *
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDao userDao;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRoleService roleService;

    @Autowired
    private MailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    /**
     * /delete  --> Delete the user having the passed id.
     *
     * @param id The id of the user to delete
     * @return A string describing if the user is succesfully deleted or not.
     */
    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) {
        try {
            UserEntity user = new UserEntity(id);
            userDao.delete(user);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);     //"Error deleting the user: " + ex.toString();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * /get-by-email  --> Return the id for the user having the passed email.
     *
     * @param email The email to search in the database.
     * @return The user id or a message error if the user is not found.
     */
    @GetMapping("/getbyemail{email}")
    public ResponseEntity<UserDto> getByEmail(@PathVariable String email) {
        UserDto userDto;
        try {
            userDto = userService.getUserByEmail(email);
        } catch (NullPointerException en) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }


    /**
     * /update  --> Update the email and the name for the user in the database
     * having the passed id.
     *
     * @param id The id for the user to update.   *
     * @return user and status
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") long id, @Validated @RequestBody UserDto userDto) {

        UserDto findUser = userService.findById(id);
        UserDto respDto;
        if (findUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //("User with id " + id + " not found");
        }
        try {
            respDto = userService.updateUser(userDto, id);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity<>(respDto, HttpStatus.OK);
    }


    /**
     * @return list of all users
     */
    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getUsers() { //todo: logging
        List<UserDto> userList = userService.getAllUsers();
        if (userList.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
    }


    /**
     * @param id - user ID
     * @return single user by ID, 404 otherwise
     */
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> getUser(@PathVariable("id") long id) {
        UserDto userDto = userService.findById(id);
        if (userDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping(value = "/upload/{userID}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadImage(@PathVariable("userID") Long userId,       //todo: generate unic file name
                            @RequestParam("image") MultipartFile multipartFile) {
        String separator = File.separator;
        final String UPLOADED_FOLDER =getClass().getClassLoader().getResource("static").getPath() + separator + "images"+ separator + userId + separator;
        try {
            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + multipartFile.getOriginalFilename());
            new File(UPLOADED_FOLDER).mkdir();
            Files.write(path, bytes);
        } catch (Exception e ) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/sendMailFromUser")
    public void sendMailFromUser(@Valid @RequestBody SendMailFromUserDto dto){
        String subject = "Feedback from Baglab.com";
        String template = "feedback.html";
        String body = templateEngine.build(template, new HashMap<String,String>() {{
            put("name", dto.getName());
            put("lastname", dto.getEmail());
            put("email", dto.getEmail());
            put("phone", dto.getPhone());
            put("message", dto.getMessage());
        }});
        boolean success = mailSender.sendMail("baglab.eu.bionic@gmail.com", subject, body);
        System.out.println("Mail success: " + success);
    }

    @GetMapping("/roles")
        public ResponseEntity<List<UserRoleDto>> getUserRoles(){
            return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
        }
}


//create new user:
//    {
//        "password": "asd13212dss",
//        "userDto": {
//        "login": "man2age2rD2a",
//        "email": "l2sd3ao@1D",
//        "firstname": "La22o1s",
//        "lastname": "Dz123is",
//        "role": {
//        "idRole": 4,
//        "name": "Factory",
//        "description": "Create products according to orders.",
//        "deleted": 0
//        },
//        "statusId": 1,
//        "deleted": 0
//        }
//    }