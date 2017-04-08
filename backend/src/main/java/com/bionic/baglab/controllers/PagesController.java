package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.PagesDao;
import com.bionic.baglab.domains.PagesEntity;
import com.bionic.baglab.dto.PagesDto;
import com.bionic.baglab.services.PagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by username on 3/21/17.
 */

@RestController
public class PagesController {

    @Autowired
    private PagesService pagesService;

    @RequestMapping("/news")
    public ResponseEntity<Set<PagesDto>> showPages(){
        Set<PagesDto> pagesSet = null;
        try {
            pagesSet = pagesService.getAllNews();
        }
        catch (Exception ex){
            System.out.println("error, no pages found: " + ex); //todo: logging
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pagesSet, HttpStatus.OK);
    }

}
