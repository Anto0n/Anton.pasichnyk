package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.PanelEntity;
import com.bionic.baglab.services.PanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * Created by Potaychuk Sviatoslav on 14.06.2017.
 */
@RestController
@RequestMapping(value = "/api/panel")
public class PanelController {

    private final PanelService panelService;

    @Autowired
    public PanelController(PanelService panelService) {
        this.panelService = panelService;
    }

    @GetMapping(value = "/list")
    public Set<PanelEntity> getAll(){
        return panelService.getAll();
    }

}
