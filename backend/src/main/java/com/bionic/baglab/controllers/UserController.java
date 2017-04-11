package com.bionic.baglab.controllers;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.dto.user.UserDtoAndPassword;
import com.bionic.baglab.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import springfox.documentation.service.ResponseMessage;

import java.util.List;
import java.util.Set;


/**
 * A class to test interactions with the MySQL database using the UserDao class. *

 */
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserDao userDao;
  @Autowired
  private UserService userService;

  /**
   * /create  --> Create a new user and save it in the database.
   * 
   * @param userDtoAndPassword
   * @return A string describing if the user is succesitfully created or not.
   */
  @PostMapping(value = "/create")
  public  ResponseEntity<Void> createUser(@RequestBody UserDtoAndPassword userDtoAndPassword, UriComponentsBuilder ucBuilder) { //,  UriComponentsBuilder ucBuilder)
    String password = userDtoAndPassword.getPassword();
    UserDto userDto = userDtoAndPassword.getUserDto();
    if (userService.isUserExist(userDto)) {
      return new ResponseEntity<>(HttpStatus.CONFLICT); //"A User with name " + userDto.getIdUser() + " already exist"
    }
   Boolean created;
   created = userService.createUser(userDto, password);
   if(!created)
     return new ResponseEntity<>(HttpStatus.CONFLICT);

    try {
      userDto = userService.getUserByEmail(userDto.getEmail());   // renew DTO object
    } catch (Exception e) { }

    HttpHeaders headers = new HttpHeaders();
   headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(userDto.getIdUser()).toUri());  // for what ???
   return new ResponseEntity<>(HttpStatus.CREATED);

  }


  
    /**
   * /delete  --> Delete the user having the passed id.
   * 
   * @param id The id of the user to delete
   * @return A string describing if the user is succesfully deleted or not.
   */
  @DeleteMapping("/delete{id}")
  public String delete(@PathVariable("id") long id) {
    try {
      UserEntity user = new UserEntity(id);
      userDao.delete(user);
    }
    catch (Exception ex) {
      return "Error deleting the user: " + ex.toString();
    }
    return "User succesfully deleted!";
  }



  /**
   * /get-by-email  --> Return the id for the user having the passed email.
   * 
   * @param email The email to search in the database.
   * @return The user id or a message error if the user is not found.
   */
  @GetMapping("/getbyemail{email}")
  public ResponseEntity<UserDto> getByEmail(@PathVariable  String email) {
  UserDto userDto;
    try {
      userDto = userService.getUserByEmail(email);
    } catch (NullPointerException en){
      return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
    }
    catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
  }



  /**
   * /update  --> Update the email and the name for the user in the database 
   * having the passed id.
   * 
   * @param id The id for the user to update.   *
   * @return user and status
   */
  @PutMapping("/update")
  public ResponseEntity<UserDto> updateUser(@PathVariable("id") long id, @RequestBody UserDto userDto) {

    UserDto findUser = userService.findById(id);
    if (findUser==null) {
      return new ResponseEntity<UserDto>(HttpStatus.NOT_FOUND); //("User with id " + id + " not found");
    }
    try {
      userService.updateUser(userDto);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
    return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
  }



  /**
   *
   * @return list of all users
   */
  @GetMapping("/list")
  public ResponseEntity<List<UserDto>> getUsers() { //todo: logging
    List<UserDto> userList =  userService.getAllUsers();
    if (userList.size() == 0)
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
  }



  /**
   *
   * @param id - user ID
   * @return single user by ID, 404 otherwise
   */
  @GetMapping(value = "/{id}",  produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<UserDto> getUser(@PathVariable("id") long id) {
    UserDto userDto = userService.findById(id);
    if (userDto == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(userDto, HttpStatus.OK);
  }


//todo: rewrite with dto/services
}


//create user:
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