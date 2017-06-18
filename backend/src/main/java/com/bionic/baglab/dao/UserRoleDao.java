package com.bionic.baglab.dao;

import com.bionic.baglab.domains.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserRoleDao extends CrudRepository<UserRole, Long> {
    public UserRole findUserRoleByName(String name);
    public List<UserRole> findAll();
}
