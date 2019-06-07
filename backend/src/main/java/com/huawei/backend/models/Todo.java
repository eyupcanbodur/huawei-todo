package com.huawei.backend.models;

import org.bson.types.ObjectId;
import java.util.List;
import org.springframework.data.annotation.Id;
import lombok.*;

import com.huawei.backend.models.SubTodo;

@Getter
@Setter
@NoArgsConstructor
public class Todo {
    @Id
    private ObjectId _id;
    private String title;
    private List<SubTodo> todos;
    private Long editedOn;
    private ObjectId userId;

    public Todo(ObjectId _id, String title, List<SubTodo> todos, Long editedOn, ObjectId userId) {
        this._id = _id;
        this.title = title;
        this.editedOn = editedOn;
        this.userId = userId;
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