package com.bionic.baglab;

import com.bionic.baglab.dao.UserRoleDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.domains.UserRole;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.services.UserService;
import junit.framework.AssertionFailedError;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.constraints.AssertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    UserEntity user;
    UserDto userDto;

    @Autowired
    UserService userService;

    @Autowired
    UserRoleDao userRoleDao;

    private final String PASSWORD = "0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e"; //'password1' SHA-256 produces a 256-bit (32-byte) hash value.
    private final String EMAIL ="test@mail1a594442a01c6";


    @Before
    public void init(){
        user = new UserEntity();
        UserRole userRole = userRoleDao.findOne(5L); //get User Role;

        user.setLogin("test user login");
        user.setEmail(EMAIL);
        user.setFirstname("Fname1");
        user.setLastname("Lname2");
        user.setRole(userRole);
        user.setStatusId(1L);
        this.userDto = new UserDto(user);

    }

    @After
    public void after() {

    }

    @Test
    public void testCreateUser(){                   //todo: rewrite correct
        userService.createUser(userDto, PASSWORD);

        try {
            userDto = userService.getUserByEmail(EMAIL);
        } catch (Exception e) {
            e.printStackTrace();
           //new AssertionFailedError();
        }
        Assert.assertNotNull(userDto);
    }

    @Test
    public void testDeleteUser(){
        Boolean deleted = false;
        // todo:find by id
        try {
            deleted = userService.deleteUserByEmail(EMAIL);
        } catch (Exception e) {
            e.printStackTrace();

        }
        Assert.assertTrue(deleted);
    }



}
