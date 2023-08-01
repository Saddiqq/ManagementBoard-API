package com.example.Management.Board.API.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;



@Entity
@Table(name = "boards")
public class BoardModel extends BaseEntity {

    @Column(name = "name")
    private String name;

    // getters and setters...
}

