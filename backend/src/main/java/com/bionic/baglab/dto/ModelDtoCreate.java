package com.bionic.baglab.dto;


import com.bionic.baglab.dto.enums.ModelStatus;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ModelDtoCreate {
    @NotNull(message = "error.uid.notnull")
    private long userId;
    @NotNull(message = "error.bagTypeId.notnull")
    private long bagTypeId;
    @NotNull(message = "error.materialId.notnull")
    private long materialId;
    @NotNull(message = "error.mname.notnull")
    @Size(min = 1, max = 45, message = "error.mname.size")
    private String mname;
    @NotNull(message = "error.approved.notnull")
    private ModelStatus approved;

    public ModelDtoCreate() {
    }

    public ModelDtoCreate(long userId, long bagTypeId, long materialId, String mname, ModelStatus approved) {
        this.userId = userId;
        this.bagTypeId = bagTypeId;
        this.materialId = materialId;
        this.mname = mname;
        this.approved = approved;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBagTypeId() {
        return bagTypeId;
    }

    public void setBagTypeId(long bagTypeId) {
        this.bagTypeId = bagTypeId;
    }

    public long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(long materialId) {
        this.materialId = materialId;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public ModelStatus getApproved() {
        return approved;
    }

    public void setApproved(ModelStatus approved) {
        this.approved = approved;
    }
}
