package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.ModelDto;
import com.bionic.baglab.dto.ModelSetDto;
import com.bionic.baglab.services.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by nicot on 4/1/2017.
 */
@RestController
@RequestMapping("/api/models")
//@RequestMapping("/models")
//@Order(1)
//@RepositoryRestController
public class ModelController {


    @Autowired
    private ModelService modelService;

    @RequestMapping(value = "/{modelId}/delete", method = RequestMethod.GET) //TODO change to POST method
    public ResponseEntity<?> delete(@PathVariable("modelId") long modelId) {
        ModelEntity model = modelService.findOne(modelId);
        model.setDeleted(true);
        modelService.save(model);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{modelId}/save") //TODO change to POST method
    public void saveModel (ModelEntity newModel) {
        modelService.save(newModel);
    }

    @GetMapping(value = "/{userId}/list")
    public ResponseEntity<List<ModelDto>> findAllModelsbyUserId(@PathVariable("userId") long userId){
        return new ResponseEntity<>(modelService.findAllModelsbyUserId(userId), HttpStatus.OK);
    }

    @PutMapping(value = "/aprfalse/{modelId}")
    public ResponseEntity<Void> setModelApprovedFalse(@PathVariable("modelId") long modelId){
        boolean approved = false;
        modelService.setModelApproved(modelId, approved);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @PutMapping(value = "/aprtrue/{modelId}")
    public ResponseEntity<Void> setModelApprovedTrue(@PathVariable("modelId") long modelId){
        boolean approved = true;
        modelService.setModelApproved(modelId, approved);
        return new ResponseEntity<>( HttpStatus.OK);

    }
    // set model approved to false
    //set model approved to true
}
