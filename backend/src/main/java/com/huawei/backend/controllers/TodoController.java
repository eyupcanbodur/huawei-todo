package com.huawei.backend.controllers;

import com.huawei.backend.models.Todo;
import com.huawei.backend.repositories.TodoRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoRepository repository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Todo getTodoById(@PathVariable("id") ObjectId id) {
        return repository.findBy_id(id);
    }

    @RequestMapping(params = "userId", method = RequestMethod.GET)
    public List<Todo> getUserTodos(@RequestParam("userId") ObjectId userId) {
        return repository.findByUserId(userId);
    }

    @RequestMapping(params = { "userId", "title" }, method = RequestMethod.GET)
    public Todo getTodoByTitle(@RequestParam("title") String title, @RequestParam("userId") ObjectId userId) {
        return repository.findByUserIdAndTitle(userId, title);
    }

    @RequestMapping(params = "todoId", method = RequestMethod.POST)
    public void modifyTodoById(@RequestParam(value = "todoId") ObjectId id, @Valid @RequestBody Todo todo) {
        todo.set_id(id);
        repository.save(todo);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createTodo(@Valid @RequestBody Todo todo) {
        todo.set_id(ObjectId.get());
        repository.save(todo);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void deleteTodo(@RequestParam("todoId") ObjectId id) {
        repository.delete(repository.findBy_id(id));
    }
}