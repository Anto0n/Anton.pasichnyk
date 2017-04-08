package com.bionic.baglab.dao;

import com.bionic.baglab.domains.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * A DAO for the domains User is simply created by extending the CrudRepository
 * interface provided by spring. The following methods are some of the ones
 * available from such interface: save, delete, deleteAll, findOne and findAll.
 * The magic is that such methods must not be implemented, and moreover it is
 * possible create new query methods working only by defining their signature!
 */
@Transactional
public interface UserDao extends CrudRepository<UserEntity, Long> {

    /**
     * Return the user having the passed email or null if no user is found.
     *
     * @param email the user email.
     */
    public UserEntity findByEmail(String email);

    public UserEntity findByLogin(String login);

    public List<UserEntity> findAllByRoleName(String role);
}
