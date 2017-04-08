package com.bionic.baglab;

import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDaoTest {
    private final String managerRole = "Factory";

    @Autowired
    private UserDao userDao;

    @Test
    public void getAllUsersByRoleName(){
        List<UserEntity> userEntities =  userDao.findAllByRoleName(managerRole);
        Assert.assertNotNull(userEntities);
    }

}
