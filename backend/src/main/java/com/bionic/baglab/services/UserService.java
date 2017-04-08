package com.bionic.baglab.services;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;


    /**
     *
     * @return   List<UserDto> - all users. DTO didn't contain passwords
     */

    public List<UserDto> getAllUsers(){
        List<UserEntity> userEntities = null;
        List<UserDto> userDtos;
        try {
            userEntities = (List<UserEntity>) userDao.findAll();
        }
        catch (Exception ex) {
            System.out.println("error, no users found: " + ex); //todo: logging
        }
        userDtos = userEntities.stream()        //make list of userDto from userEntity list
                .map(userEntity -> new UserDto(userEntity))
                .collect(Collectors.toList());
    return userDtos;
    }


    /**
     *
     * @param role - user role from connected table
     * @return Set of all users, specified by 'role'
     */
   public Set<UserDto> getAllUsersByRole(String role) {
        List<UserEntity> userEntities = null;
        try {
            userEntities = userDao.findAllByRoleName(role);
        }
        catch (Exception ex) {
            System.out.println("error, no users found. role: " + role+ " ex:" + ex); //todo: logging
        }
        return this.getDtofromEntity(userEntities);
    }

    /**
     * transform Enteties set to DTO set
     * @param userEntities
     * @return Set<UserDto>
     */
    private Set<UserDto> getDtofromEntity(List<UserEntity> userEntities){
        Set<UserDto> userDtos = userEntities.stream()        //make list of userDto from userEntity list
                .map(userEntity -> new UserDto(userEntity))
                .collect(Collectors.toSet());
        return userDtos;
    }
}
