import express from "express";
import _ from "lodash";

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3001);

const users = [{
    id: 1,
    name: "홍길동",
    age: 21
},{
    id: 2,
    name: "김길규",
    age: 25
},{
    id: 3,
    name: "고길동",
    age: 22
},{
    id: 4,
    name: "둘리",
    age: 31
},{
    id: 5,
    name: "또치",
    age: 29
}];

let user;

app.get("/", (req, res) => {
    res.send(user);
});

app.get("/:id", (req, res) => {
    const result = _.find(users, { id: parseInt(req.params.id) });
    res.send(result);
});

// 유저 생성
app.post("/", (req, res) => {
    const check_user = _.find(users, ["id", req.body.id]);
    let msg = req.body.id + "아이디를 가진 유저가 이미 존재합니다.";
    let success = false;
    if (!check_user) {
        users.push(req.body);
        msg = req.body.name+"유저가 추가되었습니다"
    } else {
        result = "입력 요청 값이 잘못되었습니다."
    }
    res.send({
        result
    });
});

// name 변경
app.put("/:id", (req, res) => {
    let result = `아이디가 ${req.params.id}인 유저가 존재하지 않습니다.`;
    if (user && user.id == req.params.id) {
        user.name = req.body.name;
        result = `유저 이름을 ${user.name}으로 변경`
    } else {
        res.send({
            result
        })
    }
    res.send({
        result
    })
});

// user 지우기
app.delete("/:id", (req, res) => {
    let result = `아이디가 ${req.params.id}인 유저가 존재하지 않습니다.`;
    if(user && user.id == req.params.id){
        user = null;
        result = `아이디가 ${req.params.id}인 유저 삭제`;
    }
    res.send({
        result
    });
});

export default Router;