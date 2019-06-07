package com.huawei.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class User {
    @Id
    private ObjectId _id;
    private String name;
    private String email;
    private String password;
    private List<Todo> todos;

    public User(ObjectId _id, String name, String email, String password, List<Todo> todos) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.todos = todos;
    }

    // ObjectId needs to be converted to string
    public String get_id() {
        return _id.toHexString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

}