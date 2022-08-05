import express from 'express'

const app = express()
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
const port = 3000

const db = {
    courses: [
        {id: 1, title: "front-end"},
        {id: 2, title: "back-end"},
        {id: 3, title: "automation qa"},
        {id: 4, title: "devops"}
    ]
}


app.get('/courses', (req, res) => {
    let foundCourses = db.courses
    if(req.query.title) {
        foundCourses = foundCourses.filter(v => v.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundCourses)
})

app.get('/courses/:id', (req, res) => {
    const foundCurs = db.courses.find(v => v.id === +req.params.id)

    if(!foundCurs) {
        res.sendStatus(404)
        return
    }

    res.json(foundCurs)
})

app.post('/courses', (req, res) => {
    const createdCourse = {id: db.courses.length + 1, title: req.body.title}
    db.courses.push(createdCourse)
    res.json(createdCourse)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})