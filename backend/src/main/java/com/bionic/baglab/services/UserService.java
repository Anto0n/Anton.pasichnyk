package com.bionic.baglab.services;


import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

//todo: logging
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
            System.out.println("error, no users found: " + ex);
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
            System.out.println("error, no users found. role: " + role+ " ex:" + ex);
        }
        return this.getDtosfromEntitys(userEntities);
    }


    /**
     *
     * @param userDto
     * @param password
     * @return true, if created success. False otherwise
     */
    @Transactional
    public boolean createUser(UserDto userDto, String password){
        UserEntity user;
        try {
         user = new UserEntity(userDto); //todo: validate fields for values
            user.setPassword(password);
            userDao.save(user);
        }
        catch (Exception ex) {
            return false; //"Error creating the user: " + ex.toString();
        }
       return true;// "User succesfully created! (id = " + user.getIdUser() + ")";
    }


    /**
     *
     * @param email
     * @return userDTO, find by email
     * @throws Exception
     */
    public UserDto getUserByEmail(String email) throws  Exception{
        String userId;
        UserDto userDto;
        UserEntity user = userDao.findByEmail(email);
        userDto = new UserDto(user);
       return userDto;
    }

    //delete
    @Transactional
    public boolean deleteUserByEmail(String email) throws  Exception {
        if (email == "" || email == null)
            throw  new IllegalArgumentException(email);
        userDao.deleteByEmail(email);
        return true;
    }

    //update
    @Transactional
    public void updateUser(UserDto userDto) throws Exception {
        UserEntity user;
        user = new UserEntity(userDto);
        userDao.save(user);
    }


    public UserDto findById(long id) {
        UserEntity user = userDao.findOne(id);
        if (user == null)
            return null;
        return new UserDto(user);
    }

    public boolean isUserExist(UserDto userDto) {
        UserEntity userEntity;
        try {
            userEntity = userDao.findByEmail(userDto.getEmail());
        } catch (Exception e){
            return false;        //errors
        }
        if (userEntity == null)
            return false;
        return true;
    }

    /**
     * transform Enteties set to DTO set
     * @param userEntities
     * @return Set<UserDto>
     */
    private Set<UserDto> getDtosfromEntitys(List<UserEntity> userEntities){
        Set<UserDto> userDtos = userEntities.stream()        //make list of userDto from userEntity list
                .map(userEntity -> new UserDto(userEntity))
                .collect(Collectors.toSet());
        return userDtos;
    }



}
