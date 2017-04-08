package com.bionic.baglab.controllers;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * A class to test interactions with the MySQL database using the UserDao class. *

 */
@Controller
public class UserController {

  @Autowired
  private UserDao userDao;
  @Autowired
  private UserService userService;

  /**
   * /create  --> Create a new user and save it in the database.
   * 
   * @param email User's email
   * @param name User's name
   * @return A string describing if the user is succesfully created or not.
   */
  @RequestMapping("/create")
  @ResponseBody
  public String create(String email, String name) {
    UserEntity user;
    try {
      user = new UserEntity(email, name);
      userDao.save(user);
    }
    catch (Exception ex) {
      return "Error creating the user: " + ex.toString();
    }
    return "User succesfully created! (id = " + user.getIdUser() + ")";
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
  @RequestMapping("/get-by-email")
  @ResponseBody
  public String getByEmail(String email) {
    String userId;
    try {
      UserEntity user = userDao.findByEmail(email);
      userId = String.valueOf(user.getIdUser());
    }
    catch (Exception ex) {
      return "User not found";
    }
    return "The user id is: " + userId;
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
  @RequestMapping("/users")
  @ResponseBody
  public List<UserDto> getUsers() { //todo: logging
    return userService.getAllUsers();
  }

//todo: rewrite with dto/services
}
