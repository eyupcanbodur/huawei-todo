package com.huawei.backend.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class SubTodo {
    private String description;
    private Boolean status;

    public SubTodo(String description, Boolean status) {
        this.description = description;
        this.status = status;
    }

}