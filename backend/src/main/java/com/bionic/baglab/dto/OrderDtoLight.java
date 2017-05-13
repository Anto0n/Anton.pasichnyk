package com.bionic.baglab.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@ApiModel
public class OrderDtoLight {
    @NotNull(message = "error.uid.notnull")
    private long userId;
    private List<Long> modelsId = new ArrayList<>();

    @JsonCreator
    public OrderDtoLight(@JsonProperty("userId") long userId,
                         @JsonProperty("modelsId") List<Long> modelsIds) {
        this.userId = userId;
        this.modelsId = modelsIds;
    }

    public long getUserId() {
        return userId;
    }

    public List<Long> getModelsId() {
        return modelsId;
    }

    @Override
    public String toString() {
        return "OrderDtoTest{" +
                "userId=" + userId +
                ", modelsId=" + modelsId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderDtoLight that = (OrderDtoLight) o;

        if (userId != that.userId) return false;
        return modelsId != null ? modelsId.equals(that.modelsId) : that.modelsId == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (userId ^ (userId >>> 32));
        result = 31 * result + (modelsId != null ? modelsId.hashCode() : 0);
        return result;
    }
}
