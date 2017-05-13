package com.bionic.baglab.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@ApiModel
public class OrderDtoLight {

    @NotNull(message = "hello")
//    @NotEmpty (message = "hello")
    private Long userId;

    @NotNull(message = "hello")
//    @NotEmpty(message = "hello")
    private List<Long> modelsId = new ArrayList<>();

    @JsonCreator
    public OrderDtoLight(@JsonProperty("userId") Long userId,
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderDtoLight that = (OrderDtoLight) o;

        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        return modelsId != null ? modelsId.equals(that.modelsId) : that.modelsId == null;
    }
    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + (modelsId != null ? modelsId.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "OrderDtoLight{" +
                "userId=" + userId +
                ", modelsId=" + modelsId +
                '}';
    }


}
