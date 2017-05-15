package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.enums.PagesStatusNameEnum;
import com.bionic.baglab.dto.pages.CreatePagesDto;
import com.bionic.baglab.dto.pages.PagesDto;
import com.bionic.baglab.dto.pages.PagesStatusDto;
import com.bionic.baglab.services.PagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/news")
public class PagesController { //todo: add services

    @Autowired
    private PagesService pagesService;

    /**
     *
     * @return Set of all news pagesDto with status ACTIVE
     */
    @GetMapping("/list")
    public ResponseEntity<Set<PagesDto>> getAllNewsActive(){
        Set<PagesDto> pagesSet = null;
        try {
            pagesSet = pagesService.getAllNewsActive(PagesStatusNameEnum.ACTIVE);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //("error, no pages found: " + ex); //todo: logging
        }
        return new ResponseEntity<>(pagesSet, HttpStatus.OK);
    }

    /**
     *
     * @return Set of all news pagesDto, all Statuses
     */
    @GetMapping("/list/all")
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

    @PutMapping("/update/status/")
    public ResponseEntity<Void> updateNews(@Validated @RequestBody PagesStatusDto pagesStatusDtoDto){
        //get by id? error othervise, update
        try{
        pagesService.changeStatus(pagesStatusDtoDto);
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
