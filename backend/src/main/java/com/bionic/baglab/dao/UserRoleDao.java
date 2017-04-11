package com.bionic.baglab.dao;

import com.bionic.baglab.domains.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRoleDao extends CrudRepository<UserRole, Long> {

}
