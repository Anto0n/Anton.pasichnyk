package com.bionic.baglab.controllers;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


/**
 * A class to test interactions with the MySQL database using the UserDao class. *

 */
@Controller
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserDao userDao;
  @Autowired
  private UserService userService;

  /**
   * /create  --> Create a new user and save it in the database.
   * 
   * @param password
   * @param userDto
   * @return A string describing if the user is succesitfully created or not.
   */
  @PostMapping("/create")
  @ResponseBody
  public  ResponseEntity<Void> create(@PathVariable UserDto userDto, @PathVariable String password) {
   Boolean created;
   created = userService.createUser(userDto, password);
   if(created)
       return new ResponseEntity<>(HttpStatus.OK);
   else return new ResponseEntity<>(HttpStatus.OK);
  }
  
    /**
   * /delete  --> Delete the user having the passed id.
   * 
   * @param id The id of the user to delete
   * @return A string describing if the user is succesfully deleted or not.
   */
  @RequestMapping("/delete")
  @ResponseBody
  public String delete(long id) {
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
  @ResponseBody
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
   * @param id The id for the user to update.
   * @param email The new email.
   * @param name The new name.
   * @return A string describing if the user is succesfully updated or not.
   */
  @RequestMapping("/update")
  @ResponseBody
  public String updateUser(long id, String email, String name) {
    try {
      UserEntity user = userDao.findOne(id);
      System.out.println("lastname------" + name);
      user.setEmail(email);
      user.setLastname(name);
      userDao.save(user);

    }
    catch (Exception ex) {
      return "Error updating the user: " + ex.toString();
    }
    return "User succesfully updated!";
  }

  /**
   *
   * @return list of all users
   */
  @RequestMapping("/list")
  @ResponseBody
  public List<UserDto> getUsers() { //todo: logging
    return userService.getAllUsers();
  }

//todo: rewrite with dto/services
}
