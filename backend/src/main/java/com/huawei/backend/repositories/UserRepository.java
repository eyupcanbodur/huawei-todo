package com.huawei.backend.repositories;

import com.huawei.backend.models.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;

// Connector for Model to MongoDB.
public interface UserRepository extends MongoRepository<User, String> {
    User findBy_id(ObjectId _id);

    User findByEmail(String email);

    // @Query("{ 'name' : ?0, 'passowrd':?0}")
    User findByEmailAndPassword(String email, String password);
}