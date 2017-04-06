package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.ModelDao;
import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.domains.ModelPriceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by nicot on 4/1/2017.
 */
@RestController
@RequestMapping("/models")
@Order(1)
//@RepositoryRestController
public class ModelController {

    @Autowired
    private ModelDao modelDao;

    @RequestMapping(value = "/{modelId}/changePrice", method = RequestMethod.GET)
    public ResponseEntity<?> changePrice(@PathVariable("modelId") long modelId, @RequestParam("price") int price) {
        ModelEntity model = modelDao.findOne(modelId);
        model.getPriceEntities().add(new ModelPriceEntity(model, price));
        modelDao.save(model);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/{modelId}/delete", method = RequestMethod.GET)
    public ResponseEntity<?> delete(@PathVariable("modelId") long modelId) {
        ModelEntity model = modelDao.findOne(modelId);
        model.setDeleted(true);
        modelDao.save(model);
        return ResponseEntity.noContent().build();
    }

}
