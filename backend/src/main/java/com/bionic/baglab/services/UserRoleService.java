package com.bionic.baglab.services;


import com.bionic.baglab.dao.UserRoleDao;
import com.bionic.baglab.domains.UserRole;
import com.bionic.baglab.dto.user.UserRoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserRoleService {
    @Autowired
    private UserRoleDao userRoleDao;

    public List<UserRoleDto> getAllRoles(){
        List<UserRole> listEnt = null;
        List<UserRoleDto> listDto = null;
        try{
            listEnt = userRoleDao.findAll();
        }catch (Exception e){
            System.out.println("error, no roles found: " + e);
        }
        listDto = listEnt.stream()
                .map(userRole -> new UserRoleDto(userRole))
                .collect(Collectors.toList());
        return listDto;
    }


    public UserRole findOne(long roleId) {
        return userRoleDao.findOne(roleId);
    }
}
