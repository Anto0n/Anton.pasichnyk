package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.PagesDao;
import com.bionic.baglab.domains.PagesEntity;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.CreatePagesDto;
import com.bionic.baglab.dto.PagesDto;
import com.bionic.baglab.services.PagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/news")
public class PagesController { //todo: add services

    @Autowired
    private PagesService pagesService;

    /**
     *
     * @return Set of all news pagesDto
     */
    @GetMapping("/list")
    public ResponseEntity<Set<PagesDto>> getAllNews(){
        Set<PagesDto> pagesSet = null;
        try {
            pagesSet = pagesService.getAllNews();
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //("error, no pages found: " + ex); //todo: logging
        }
        return new ResponseEntity<>(pagesSet, HttpStatus.OK);
    }

    /**
     *
     * @return distinct news page by @id
     */

    @GetMapping("/{id}")
    public ResponseEntity<PagesDto> getNewsById(){
        PagesDto pagesDto = null;
        try {
           // pagesDto = pagesService.getNewsById(id);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<PagesDto>(pagesDto, HttpStatus.OK);
    }


    @PostMapping(value = "/create")
    public  ResponseEntity<Void> createNews(@Validated @RequestBody CreatePagesDto pagesDto ){
        try{
            pagesService.createNews(pagesDto);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateNews(@Validated @RequestBody PagesDto pagesDto){
        //get by id? error othervise, update
        try{

        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable("id") long id){
        PagesDto pagesDto = null;
        try {
            pagesService.deleteNews(id);
        }
        catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);     //"Error deleting the news: " + ex.toString();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

//'body 1', '<h1>header1</h1>', '1');
// `body` MEDIUMTEXT NULL,
//  `header` VARCHAR(450) NULL,
