package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.ModelDao;
import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.JResponse;
import com.bionic.baglab.dto.ModelDto;
import com.bionic.baglab.dto.ModelDtoCreate;
import com.bionic.baglab.dto.enums.ModelStatusEnum;
import com.bionic.baglab.services.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/models")
public class ModelController {
    @Autowired
    private ModelDao modelDao;
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
    public void saveModel(ModelEntity newModel) {
        modelService.save(newModel);
    }

    @GetMapping(value = "/{userId}/list")
    public ResponseEntity<List<ModelDto>> findAllModelsbyUserId(@PathVariable("userId") long userId) {
        return new ResponseEntity<>(modelService.findAllModelsbyUserId(userId), HttpStatus.OK);
    }

    @GetMapping(value = "/approve/{modelId}")
    public ResponseEntity<JResponse> setModelApprovedFalse(@PathVariable("modelId") long modelId,
                                                           @RequestParam ModelStatusEnum approved) {
        modelService.setModelApproved(modelId, approved);
        return new ResponseEntity<>(new JResponse(), HttpStatus.OK);
    }

   /* @PutMapping(value = "/aprtrue/{modelId}")
    public ResponseEntity<Void> setModelApprovedTrue(@PathVariable("modelId") long modelId) {
        boolean approved = true;
        modelService.setModelApproved(modelId, approved);
        return new ResponseEntity<>(HttpStatus.OK);

    }*/

    @GetMapping(value = "/list")
    public ResponseEntity<List<ModelDto>> findAllModels() {
        return new ResponseEntity<>(modelService.findAllModels(), HttpStatus.OK);
    }

    @GetMapping(value = "/list/{approved}")
    public ResponseEntity<List<ModelDto>> findAllModelsParam(@PathVariable("approved") ModelStatusEnum approved) {
        return new ResponseEntity<>(modelService.findAllModelsParam(approved), HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<ModelDtoCreate> createModelDto(@Validated @RequestBody ModelDtoCreate modelDtoCreate) {
        boolean created = modelService.createModel(modelDtoCreate);
        if(!created)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<JResponse> deleteUser(@PathVariable("id") long id) {
        try {
            ModelEntity model = new ModelEntity(id);
            modelDao.delete(model);
        }
        catch (Exception ex) {
            JResponse message = new JResponse("error on deleting");
            return new ResponseEntity<>(message, HttpStatus.CONFLICT);     //"Error deleting the user: " + ex.toString();
        }
        return new ResponseEntity<>(new JResponse(), HttpStatus.OK);
    }


}

