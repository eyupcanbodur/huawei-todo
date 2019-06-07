package com.huawei.backend.repositories;

import java.util.List;
import com.huawei.backend.models.Todo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

// Connector for Model to MongoDB.
public interface TodoRepository extends MongoRepository<Todo, String> {
    Todo findBy_id(ObjectId _id);

    List<Todo> findByUserId(ObjectId userId);

    Todo findByUserIdAndTitle(ObjectId userId, String title);

}