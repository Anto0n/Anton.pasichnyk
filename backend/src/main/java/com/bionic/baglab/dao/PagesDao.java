package com.bionic.baglab.dao;

import com.bionic.baglab.domains.PagesEntity;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;



@Transactional
public interface PagesDao extends CrudRepository<PagesEntity, Long> {

  /**
   * Return all pages or null if no is found.
   * 
   *
   */
  public List<PagesEntity> findAll();

  public PagesEntity findByBody(String body);

} // class UserDao
